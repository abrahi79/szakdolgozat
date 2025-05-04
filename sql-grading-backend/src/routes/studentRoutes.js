const express = require('express');
const router = express.Router();
const { getStudents } = require('../controllers/studentController');

// GET /api/students - Diákok listázása
router.get('/', getStudents);

module.exports = router;
