const mongoose = require('mongoose');
const Base = require('../models/Base');

exports.createBase = async (req, res) => {
  try {
    const { name, location, commander, assets } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Base name is required' });
    }

    // Convert commander to ObjectId if present
    let commanderId = commander ? new mongoose.Types.ObjectId(commander) : null;

    // Convert assets array entries to have ObjectId type for asset field
    let assetsFormatted = [];
    if (assets && Array.isArray(assets)) {
      assetsFormatted = assets.map(({ asset, quantity }) => ({
        asset: new mongoose.Types.ObjectId(asset),
        quantity,
      }));
    }

    const newBase = new Base({
      name,
      location,
      commander: commanderId,
      assets: assetsFormatted,
    });

    const savedBase = await newBase.save();
    res.status(201).json(savedBase);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getBases = async (req, res) => {
  try {
    const bases = await Base.find().populate('commander', 'name email');
    res.json(bases);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
