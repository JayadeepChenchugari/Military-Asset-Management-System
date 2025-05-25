const express = require('express');
const router = express.Router();
const { getDashboardSummary, getNetMovementDetails } = require('../controllers/dashboardController');

router.get('/', (req, res, next) => {
  console.log("✅ /api/dashboard hit with query:", req.query);
  next();
}, getDashboardSummary);

router.get('/net-movement-details', getNetMovementDetails);

module.exports = router;
