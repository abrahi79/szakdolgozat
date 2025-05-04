const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');

// Token ellenőrzés
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Nincs token' });

  jwt.verify(token.split(" ")[1], 'your_secret_key', (err, user) => {
    if (err) return res.status(403).json({ error: 'Érvénytelen token' });
    req.user = user;
    next();
  });
};

//  Csak tanárok hozhatnak létre feladatot
router.post('/tasks', authenticateToken, async (req, res) => {
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ error: 'Csak tanárok hozhatnak létre feladatot' });
  }

  const { title, description, solution_query, dataset_name, dataset_name_2, exam_id } = req.body;

  console.log("🔍 Beérkező adat:", req.body);
  console.log("🔑 Felhasználó tokenből:", req.user);
  try {
    const result = await pool.query(
      `INSERT INTO tasks (title, description, solution_query, dataset_name, dataset_name_2, exam_id, created_by)
 VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
[title, description, solution_query, dataset_name, dataset_name_2, exam_id, req.user.id]

    );
    
    res.json({ message: 'Feladat létrehozva', task: result.rows[0] });
  } catch (err) {
    console.error('Hiba a feladat létrehozásakor:', err);
    res.status(500).json({ error: 'Adatbázis hiba' });
  }
});

//  Minden felhasználó lekérheti a feladatokat
router.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT tasks.id, title, description, dataset_name, exam_id, created_at, users.name AS teacher_name
       FROM tasks
       JOIN users ON tasks.created_by = users.id
       ORDER BY created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Hiba a feladatok lekérdezésekor:', err);
    res.status(500).json({ error: 'Adatbázis hiba' });
  }
});


//  Diák SQL-megoldás beküldése és automatikus kiértékelése
router.post('/solutions', authenticateToken, async (req, res) => {
  const { task_id, sql_query } = req.body;

  if (req.user.role !== 'student') {
      return res.status(403).json({ error: 'Csak diákok küldhetnek be megoldást.' });
  }

  try {
      //  A diák megoldás mentése
      const insertResult = await pool.query(
          `INSERT INTO solutions (user_id, task_id, sql_query) VALUES ($1, $2, $3) RETURNING id`,
          [req.user.id, task_id, sql_query]
      );

      const solutionId = insertResult.rows[0].id;

      //  Tanári megoldás lekérése
      const taskRes = await pool.query(`SELECT solution_query FROM tasks WHERE id = $1`, [task_id]);
      const teacherQuery = taskRes.rows[0]?.solution_query;

      if (!teacherQuery) {
          return res.status(400).json({ error: "Ehhez a feladathoz nincs megadva referencia megoldás." });
      }

      //  tanári és diák lekérdezés futtatása
      const teacherResult = await pool.query(teacherQuery);
      const studentResult = await pool.query(sql_query);

      // Eredmények összehasonlítása
      const normalize = (rows) => JSON.stringify(rows.map(r => Object.entries(r).sort())).toLowerCase();
      const isCorrect = normalize(teacherResult.rows) === normalize(studentResult.rows);

      // Solution tábla frissitése
      await pool.query(`UPDATE solutions SET is_correct = $1 WHERE id = $2`, [isCorrect, solutionId]);

      // Visszajelzés
      res.json({ message: isCorrect ? " Helyes megoldás!" : " A megoldás nem helyes.", is_correct: isCorrect });

  } catch (err) {
      console.error("Hiba a megoldás kiértékelésekor:", err);
      res.status(500).json({ error: "Hiba a megoldás feldolgozásakor." });
  }
});





// Megoldások listázása tanárként egy adott feladathoz
router.get('/tasks/:id/solutions', authenticateToken, async (req, res) => {
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ error: 'Csak tanárok kérhetik le a megoldásokat.' });
  }

  const taskId = req.params.id;

  try {
    const result = await pool.query(
      `SELECT solutions.id, sql_query, submitted_at, users.name AS student_name, is_correct
       FROM solutions
       JOIN users ON solutions.user_id = users.id
       WHERE task_id = $1
       ORDER BY submitted_at DESC`,
      [taskId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Hiba a megoldások lekérdezésekor:", err);
    res.status(500).json({ error: 'Adatbázis hiba a megoldások lekérdezésekor.' });
  }
});

// Kiértékelő API - csak diákoknak
router.get('/exams/:examId/evaluation', authenticateToken, async (req, res) => {
  if (req.user.role !== 'student') {
      return res.status(403).json({ error: 'Csak diákok érhetik el az értékelést.' });
  }

  const examId = req.params.examId;

  try {
      // Összes feladat az adott dolgozathoz
      const tasksRes = await pool.query(
          `SELECT id FROM tasks WHERE exam_id = $1`,
          [examId]
      );
      const taskIds = tasksRes.rows.map(row => row.id);
      const total = taskIds.length;

      // Diák helyes megoldásai
      const correctRes = await pool.query(
        `SELECT COUNT(*) FROM (
            SELECT DISTINCT ON (task_id) task_id, is_correct
            FROM solutions
            WHERE user_id = $1 AND task_id = ANY($2)
            ORDER BY task_id, submitted_at DESC
        ) AS latest
        WHERE is_correct = true`,
        [req.user.id, taskIds]
    );
    
      const correct = parseInt(correctRes.rows[0].count);

      // Százalék és jegy
      const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
      let grade = 1;
      if (percent >= 90) grade = 5;
      else if (percent >= 75) grade = 4;
      else if (percent >= 60) grade = 3;
      else if (percent >= 40) grade = 2;

      res.json({ total, correct, percent, grade });

  } catch (err) {
      console.error('Hiba az értékelés során:', err);
      res.status(500).json({ error: 'Adatbázis hiba' });
  }
});

// Dolgozat összesített eredmények - csak tanároknak
router.get('/exams/:examId/results', authenticateToken, async (req, res) => {
  if (req.user.role !== 'teacher') {
      return res.status(403).json({ error: 'Csak tanárok érhetik el az eredményeket.' });
  }

  const examId = req.params.examId;

  try {
      // Minden diák, aki adott dolgozathoz adott le megoldást
      const studentsRes = await pool.query(
          `SELECT DISTINCT u.id, u.name
           FROM users u
           JOIN solutions s ON u.id = s.user_id
           JOIN tasks t ON s.task_id = t.id
           WHERE t.exam_id = $1 AND u.role = 'student'`,
          [examId]
      );

      const students = studentsRes.rows;

      // Összesített eredmények diákonként
      const results = [];

      for (const student of students) {
          const totalTasksRes = await pool.query(
              `SELECT COUNT(*) FROM tasks WHERE exam_id = $1`,
              [examId]
          );
          const totalTasks = parseInt(totalTasksRes.rows[0].count);

          const correctRes = await pool.query(
              `SELECT COUNT(*) FROM (
                  SELECT DISTINCT ON (task_id) task_id, is_correct
                  FROM solutions
                  WHERE user_id = $1 AND task_id IN (SELECT id FROM tasks WHERE exam_id = $2)
                  ORDER BY task_id, submitted_at DESC
              ) AS latest
              WHERE is_correct = true`,
              [student.id, examId]
          );

          const correct = parseInt(correctRes.rows[0].count);
          const percent = totalTasks > 0 ? Math.round((correct / totalTasks) * 100) : 0;
          let grade = 1;
          if (percent >= 90) grade = 5;
          else if (percent >= 75) grade = 4;
          else if (percent >= 60) grade = 3;
          else if (percent >= 40) grade = 2;

          results.push({
              student_id: student.id,
              student_name: student.name,
              total_tasks: totalTasks,
              correct,
              percent,
              grade
          });
      }

      res.json(results);

  } catch (err) {
      console.error("Hiba az eredmények lekérdezésekor:", err);
      res.status(500).json({ error: 'Adatbázis hiba' });
  }
});

// Dolgozat összesítő - tanári összegzés
router.get('/exams/:examId/summary', authenticateToken, async (req, res) => {
  if (req.user.role !== 'teacher') {
      return res.status(403).json({ error: 'Csak tanárok érhetik el az összesítést.' });
  }

  const examId = req.params.examId;

  try {
      // Minden diák, aki adott dolgozathoz adott le megoldást
      const studentsRes = await pool.query(
          `SELECT DISTINCT u.id, u.name
           FROM users u
           JOIN solutions s ON u.id = s.user_id
           JOIN tasks t ON s.task_id = t.id
           WHERE t.exam_id = $1 AND u.role = 'student'`,
          [examId]
      );

      const students = studentsRes.rows;

      const summary = [];

      for (const student of students) {
          // Összes feladat a dolgozatban
          const totalTasksRes = await pool.query(
              `SELECT COUNT(*) FROM tasks WHERE exam_id = $1`,
              [examId]
          );
          const totalTasks = parseInt(totalTasksRes.rows[0].count);

          // A diák legutolsó megoldásai feladatonként
          const latestSolutionsRes = await pool.query(
              `SELECT DISTINCT ON (task_id) task_id, is_correct
               FROM solutions
               WHERE user_id = $1 AND task_id IN (SELECT id FROM tasks WHERE exam_id = $2)
               ORDER BY task_id, submitted_at DESC`,
              [student.id, examId]
          );

          const correct = latestSolutionsRes.rows.filter(s => s.is_correct === true).length;

          const percent = totalTasks > 0 ? Math.round((correct / totalTasks) * 100) : 0;
          let grade = 1;
          if (percent >= 90) grade = 5;
          else if (percent >= 75) grade = 4;
          else if (percent >= 60) grade = 3;
          else if (percent >= 40) grade = 2;

          summary.push({
              student_name: student.name,
              total_tasks: totalTasks,
              correct,
              percent,
              grade
          });
      }

      res.json(summary);

  } catch (err) {
      console.error("Hiba az összesítés során:", err);
      res.status(500).json({ error: 'Adatbázis hiba az összesítés során.' });
  }
});

// Gyakorló SQL futtatás - mindenkinek elérhető (tanár és diák)
router.post('/try-sql', authenticateToken, async (req, res) => {
  const { sql_query } = req.body;

  // Biztonsági ellenőrzés: csak SELECT utasításokat engedünk!
  if (!sql_query.trim().toLowerCase().startsWith("select")) {
      return res.status(400).json({ error: "Csak SELECT lekérdezések engedélyezettek!" });
  }

  try {
      const result = await pool.query(sql_query);
      res.json({ rows: result.rows });
  } catch (err) {
      console.error("Hiba a gyakorló lekérdezés futtatásakor:", err);
      res.status(500).json({ error: "Hiba a lekérdezés futtatásakor." });
  }
});







module.exports = router;
