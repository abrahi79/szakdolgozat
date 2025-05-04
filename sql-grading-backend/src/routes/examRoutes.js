const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');

// Middleware: token ellenőrzés
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Nincs token' });

  jwt.verify(token.split(" ")[1], 'your_secret_key', (err, user) => {
    if (err) return res.status(403).json({ error: 'Érvénytelen token' });
    req.user = user;
    next();
  });
};

//  Dolgozat létrehozása (csak tanár)
router.post('/exams', authenticateToken, async (req, res) => {
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ error: 'Csak tanár hozhat létre dolgozatot.' });
  }

  const { title, description } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO exams (title, description, created_by) VALUES ($1, $2, $3) RETURNING *',
      [title, description, req.user.id]
    );
    res.json({ message: 'Dolgozat létrehozva!', exam: result.rows[0] });
  } catch (err) {
    console.error('Hiba a dolgozat létrehozásakor:', err);
    res.status(500).json({ error: 'Adatbázis hiba.' });
  }
});

//  Összes dolgozat listázása
router.get('/exams', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT exams.*, users.name AS teacher_name
       FROM exams
       JOIN users ON exams.created_by = users.id
       ORDER BY created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Hiba a dolgozatok lekérdezésekor:', err);
    res.status(500).json({ error: 'Adatbázis hiba.' });
  }
});

// 🔹 Egy dolgozathoz tartozó feladatok lekérdezése
router.get('/exams/:id/tasks', async (req, res) => {
  const examId = req.params.id;

  try {
    const result = await pool.query(
      `SELECT * FROM tasks WHERE exam_id = $1 ORDER BY id`,
      [examId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Hiba a dolgozat feladatainak lekérdezésekor:', err);
    res.status(500).json({ error: 'Adatbázis hiba.' });
  }
});

module.exports = router;
