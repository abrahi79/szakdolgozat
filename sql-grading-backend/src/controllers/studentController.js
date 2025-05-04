const db = require('../config/db');  // A db.js fájl importálása

// Példa egy lekérdezésre
const getStudents = (req, res) => {
  db.query('SELECT * FROM students', (err, result) => {
    if (err) {
      console.error('Hiba a lekérdezés során:', err);
      return res.status(500).send('Hiba a lekérdezés során');
    }
    res.json(result.rows);  // A lekérdezés eredményét JSON formátumban visszaadjuk
  });
};

module.exports = { getStudents };
