const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  action: {
    type: String,
    enum: [
      'Purchase',
      'Transfer In',
      'Transfer Out',
      'Asset Creation',
      'Asset Update',
      'Asset Deletion',
      'Transfer',
      'Assignment',
      'User Registration',
    ],
    required: true
  },
  details: String,
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  base: String,
  equipmentType: String
}, { timestamps: { type: Date, default: Date.now } });

module.exports = mongoose.model('Log', logSchema); // ✅ Make sure this line exists
