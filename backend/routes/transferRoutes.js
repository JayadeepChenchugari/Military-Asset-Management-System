const express = require('express');
const router = express.Router();
const {
  getTransfers,
  getTransferById,
  createTransfer,
} = require('../controllers/transferController');

const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.use(protect);

// Logistics Officer and Admin can create and view transfers
router.get('/', authorizeRoles('Admin', 'LogisticsOfficer'), getTransfers);
router.get('/:id', authorizeRoles('Admin', 'LogisticsOfficer'), getTransferById);
router.post('/', authorizeRoles('Admin', 'LogisticsOfficer'), createTransfer);

module.exports = router;
