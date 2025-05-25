const express = require('express');
const router = express.Router();
const {
  getPurchases,
  createPurchase,
} = require('../controllers/purchaseController');

const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.use(protect);

// Logistics Officer and Admin can view and create purchases
router.get('/', authorizeRoles('Admin', 'LogisticsOfficer'), getPurchases);
// router.get('/:id', authorizeRoles('Admin', 'Logistics Officer'), getPurchaseById);
router.post('/', authorizeRoles('Admin', 'LogisticsOfficer'), createPurchase);

module.exports = router;
