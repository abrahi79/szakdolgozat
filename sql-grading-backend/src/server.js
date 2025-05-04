const express = require('express');
const cors = require('cors'); // 🔹 CORS csomag
const bodyParser = require('body-parser');
const db = require('./db'); // Az adatbázis kapcsolat importálása

const app = express();
app.use(cors());  //  Ez engedélyezi minden frontendnek
app.use(express.json());
app.use(bodyParser.json());

// Tesztlekérdezés
app.get('/api/students', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM students'); // SQL lekérdezés
        res.json(result.rows); // Az eredmény JSON formátumban
    } catch (err) {
        console.error('Hiba az adatbázis-lekérdezés során:', err);
        res.status(500).send('Hiba történt az adatbázis elérésekor.');
    }
});

const authRoutes = require('./routes/authRoutes'); // Új import
app.use('/api', authRoutes); // Használjuk az útvonalat

const taskRoutes = require('./routes/taskRoutes');
app.use('/api', taskRoutes);

const datasetRoutes = require("./routes/datasetRoutes");
app.use("/api", datasetRoutes);

const examRoutes = require('./routes/examRoutes');
app.use('/api', examRoutes);




// Szerver indítása
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Szerver fut a következő porton: ${PORT}`);
});
