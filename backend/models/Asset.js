const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Vehicle', 'Weapon', 'Ammunition'], required: true },
  quantity: { type: Number, required: true },
  base: { type: mongoose.Schema.Types.ObjectId, ref: 'Base', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Asset', assetSchema);
      