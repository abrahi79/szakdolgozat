const pool = require('./db');

pool.query('SELECT * FROM students')
  .then((res) => {
    console.log("Adatbázis kapcsolat sikeres! Talált rekordok:", res.rows);
    pool.end();
  })
  .catch((err) => {
    console.error("Hiba az adatbázis lekérdezés során:", err);
    pool.end();
  });
