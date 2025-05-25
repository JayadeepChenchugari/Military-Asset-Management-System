const express = require('express');
const router = express.Router();
const {
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
} = require('../controllers/assignmentController');

const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.use(protect);

// Base Commanders and Admin can manage assignments
router.get('/', authorizeRoles('Admin', 'BaseCommander'), getAssignments);
router.get('/:id', authorizeRoles('Admin', 'BaseCommander'), getAssignmentById);
router.post('/', authorizeRoles('Admin', 'BaseCommander'), createAssignment);
router.put('/:id', authorizeRoles('Admin', 'BaseCommander'), updateAssignment);

module.exports = router;
