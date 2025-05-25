const express = require('express');
const router = express.Router();

const { createBase, getBases } = require('../controllers/baseController');

// For now no auth middleware, but you can add it here if needed
router.post('/', createBase);
router.get('/', getBases);

module.exports = router;
