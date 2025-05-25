const User = require('../models/User');
const Base = require('../models/Base');

// GET /api/users - Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('assignedBase', 'name location');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/users/:id - Update user (Admin only)
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, role, assignedBase } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, role, assignedBase },
      { new: true }
    ).populate('assignedBase', 'name location');

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/users/:id - Delete user (Admin only)
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
// GET /api/users/:id - Get user by ID (Admin only)
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).populate('assignedBase', 'name location');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
