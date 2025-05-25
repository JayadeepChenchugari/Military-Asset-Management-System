const express = require('express');
const router = express.Router();
const { getLogs } = require('../controllers/logController');

const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.use(protect);
router.use(authorizeRoles('Admin')); // Only Admin can view logs

router.get('/', getLogs);

module.exports = router;
