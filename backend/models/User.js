const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'BaseCommander', 'LogisticsOfficer'], required: true },
  assignedBase: { type: mongoose.Schema.Types.ObjectId, ref: 'Base' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
