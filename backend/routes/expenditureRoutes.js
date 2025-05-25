const express = require('express');
const router = express.Router();
const {
  getExpenditures,
  getExpenditureById,
  createExpenditure,
} = require('../controllers/expenditureController');

const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.use(protect);

// Base Commanders and Admin can manage expenditures
router.get('/', authorizeRoles('Admin', 'BaseCommander'), getExpenditures);
router.get('/:id', authorizeRoles('Admin', 'BaseCommander'), getExpenditureById);
router.post('/', authorizeRoles('Admin', 'BaseCommander'), createExpenditure);

module.exports = router;
