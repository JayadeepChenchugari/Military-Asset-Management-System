const Log = require('../models/Log');

// GET /api/logs - Admin only
exports.getLogs = async (req, res) => {
  try {
    const logs = await Log.find().populate('performedBy', 'username role').sort({ date: -1 });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
