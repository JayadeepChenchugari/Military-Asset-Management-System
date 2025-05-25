const mongoose = require('mongoose');

const baseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  commander: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assets: [
    {
      asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
      quantity: { type: Number, required: true, default: 0 }
    }
  ]
});

module.exports = mongoose.model('Base', baseSchema);
