const express = require('express');
const router = express.Router();
const {
  getAssets,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset,
} = require('../controllers/assetController');

const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// All logged-in users can view assets
router.use(protect);

router.get('/', getAssets);          // Get all assets with optional filters
router.get('/:id', getAssetById);   // Get asset by ID

// Admin only for create, update, delete
router.post('/', authorizeRoles('Admin'), createAsset);
router.put('/:id', authorizeRoles('Admin'), updateAsset);
router.delete('/:id', authorizeRoles('Admin'), deleteAsset);

module.exports = router;
