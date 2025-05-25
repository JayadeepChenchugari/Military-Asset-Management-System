const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Log = require('../models/Log');
const Base = require('../models/Base');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).populate('assignedBase');
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, role: user.role, base: user.assignedBase?._id },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        base: user.assignedBase,
      }
    });
  } catch (err) {
  console.error('Login error:', err); // <-- Add this for debugging
  res.status(500).json({ message: 'Server error during login' });
}
};


// POST /api/auth/register
exports.registerUser = async (req, res) => {
  const { username, password, role, assignedBase } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      passwordHash: hashedPassword, // ✅ FIXED
      role,
      assignedBase: assignedBase || null, // Must be a valid ObjectId
    });

    await Log.create({
      action: 'User Registration',
      details: `New user registered with username: ${username}`,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        role: newUser.role,
        assignedBase: newUser.assignedBase,
      },
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

exports.logout = (req, res) => {
  // Since JWT is stateless, you can just respond to client to delete token or
  // implement token blacklist logic here if desired.
  res.status(200).json({ message: 'Logged out successfully' });
};
