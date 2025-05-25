const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
  assetName: { type: String, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  base: { type: mongoose.Schema.Types.ObjectId, ref: 'Base', required: true }
});

module.exports = mongoose.model('Purchase', purchaseSchema);
