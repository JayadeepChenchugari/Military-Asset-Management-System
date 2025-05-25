const Log = require('../models/Log');

// Optional logging middleware
const logRequests = async (req, res, next) => {
  try {
    // Check env flag before logging
    if (process.env.LOG_API_REQUESTS === 'true') {
      await Log.create({
        action: 'API Request',
        details: `Request to ${req.method} ${req.originalUrl}`,
        performedBy: req.user ? req.user.id : undefined,
        timestamp: new Date(),
      });
    }
  } catch (error) {
    console.error('Logging failed:', error.message);
  }

  next();
};

module.exports = logRequests;
