const jwt = require('jsonwebtoken');
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      base: user.base, // Optional: if you want to embed base for RBAC checks
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d', // token valid for 1 day
    }
  );
};
module.exports = generateToken;