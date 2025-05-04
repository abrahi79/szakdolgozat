const bcrypt = require('bcrypt');
const pool = require('./db'); // Az adatbázis kapcsolatod

const email = 'teszt@example.com'; // Ezt cseréld le
const password = '123456'; // Ezt cseréld le
const role = 'student'; // Választható: 'student' vagy 'teacher'

async function createUser() {
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Jelszó hashelése
        const result = await pool.query(
            'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *',
            [email, hashedPassword, role]
        );

        console.log(' Felhasználó létrehozva:', result.rows[0]);
        process.exit(); // Kilépés
    } catch (error) {
        console.error(' Hiba történt:', error);
        process.exit(1);
    }
}

createUser();
