const express = require('express');
const router = express.Router();
const { login, registerUser, logout } = require('../controllers/authController');

router.post('/register', registerUser);  // Usually Admin-only, so can add role middleware here if needed
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
