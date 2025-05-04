const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/dataset-info/:tableName", async (req, res) => {
  const { tableName } = req.params;

  try {
    // Oszlopok lekérdezése
    const columnsQuery = `
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = $1
    `;
    const { rows: columns } = await pool.query(columnsQuery, [tableName]);

    // Minta adatok lekérdezése (max 5 sor)
    const dataQuery = `SELECT * FROM ${tableName} LIMIT 5`;
    const { rows: sampleData } = await pool.query(dataQuery);

    res.json({ columns, sampleData });
  } catch (err) {
    console.error("Hiba a tábla információinak lekérdezésekor:", err);
    res.status(500).json({ error: "Nem sikerült lekérdezni a tábla információit." });
  }
});

module.exports = router;
