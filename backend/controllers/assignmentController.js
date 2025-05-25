const Assignment = require('../models/Assignment');
const Log = require('../models/Log');

// GET /api/assignments - List all assignments
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate('asset')
      .populate('base');
    res.status(200).json(assignments);
  } catch (err) {
  console.error("Create Assignment Error:", err); // 🔥 See actual issue
  res.status(500).json({ message: 'Server error', error: err.message });
}

};

// GET /api/assignments/:id - Get assignment by ID
exports.getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate('asset')
      .populate('base');

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.status(200).json(assignment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/assignments - Create new assignment
exports.createAssignment = async (req, res) => {
  try {
    const { asset, personnelName, quantity, base, date } = req.body;

    const assignment = await Assignment.create({
      asset,
      personnelName,
      quantity,
      base,
      date,
    });

    console.log("Assignment created:", assignment);

    console.log("About to log action with user:", req.user); // 👈 Add this

    await Log.create({
      action: 'Assignment',
      details: `Assigned ${quantity} units of asset ${asset} to ${personnelName}`,
      performedBy: req.user._id,
    });

    console.log("Log created successfully");

    res.status(201).json(assignment);
  } catch (err) {
    console.error("Assignment submission failed:", err.message); // 👈 log full error
    res.status(500).json({ message: 'Server error' });
  }
};


// PUT /api/assignments/:id - Update assignment
exports.updateAssignment = async (req, res) => {
  const { id } = req.params;
  const { asset, personnelName, quantity, base, date } = req.body;

  try {
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      id,
      { asset, personnelName, quantity, base, date },
      { new: true }
    ).populate('asset').populate('base');

    if (!updatedAssignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
console.log("Logged in user:", req.user);
    await Log.create({
      action: 'Assignment Update',
      details: `Updated assignment ${id} for ${personnelName}`,
     performedBy: req.user?.id || 'system', // Fallback if no user

    });

    res.status(200).json(updatedAssignment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
