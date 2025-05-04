const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db'); // Adatbázis kapcsolat
const jwt = require('jsonwebtoken');

const router = express.Router();

// 🔹 Regisztráció (POST /register)
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Jelszó hashelése
        const hashedPassword = await bcrypt.hash(password, 10);

        // Adatbázisba mentés

        const result = await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
        [name, email, hashedPassword, role]
        );
  

        res.json({ message: 'User registered', user: result.rows[0] });
    } catch (err) {
        console.error("Regisztrációs hiba:", err); // 🔎 terminálban látod a konkrét hibát
    
        if (err.code === "23505") {
            res.status(400).json({ error: "Ez az e-mail cím már létezik!" });
        } else {
            res.status(500).json({ error: err.detail || "Adatbázis hiba történt" });
        }
    }
});

//  Bejelentkezés (POST /login)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Felhasználó keresése
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const user = result.rows[0];

        // Jelszó ellenőrzése
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Token létrehozása
        console.log("Tokenbe kerülő név:", user.name);
        const token = jwt.sign(
            { id: user.id, role: user.role, email: user.email, name: user.name },
            'your_secret_key',
            { expiresIn: '1h' }
          );
          
          

        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

// Middleware a token ellenőrzésére
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });

    jwt.verify(token.split(" ")[1], 'your_secret_key', (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

//  Védett végpont: Felhasználói profil adatai
router.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: "Sikeres hozzáférés!", user: req.user });
});

module.exports = router;
