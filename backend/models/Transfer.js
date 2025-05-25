const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
  asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
  quantity: { type: Number, required: true },
  fromBase: { type: mongoose.Schema.Types.ObjectId, ref: 'Base', required: true },
  toBase: { type: mongoose.Schema.Types.ObjectId, ref: 'Base', required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transfer', transferSchema);
