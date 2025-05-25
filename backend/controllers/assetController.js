const Asset = require('../models/Asset');
const Log = require('../models/Log');

// GET /api/assets - Retrieve assets with optional filters
exports.getAssets = async (req, res) => {
  try {
    const filters = {};
    const { type, base } = req.query;

    if (type) filters.type = type;
    if (base) filters.base = base;

    const assets = await Asset.find(filters).populate('base', 'name location');
    res.status(200).json(assets);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/assets/:id - Get asset by ID
exports.getAssetById = async (req, res) => {
  const { id } = req.params;
  try {
    const asset = await Asset.findById(id).populate('base', 'name location');
    if (!asset) return res.status(404).json({ message: 'Asset not found' });
    res.status(200).json(asset);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/assets - Create a new asset (Admin and BaseCommander)
exports.createAsset = async (req, res) => {
  const { name, type, quantity, base } = req.body;

  try {
    const asset = new Asset({ name, type, quantity, base });
    await asset.save();

    // Log creation
    await Log.create({
      action: 'Asset Creation',
      details: `Created asset ${name} (${type}) with quantity ${quantity}`,
      performedBy: req.user.id,
    });

    res.status(201).json(asset);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/assets/:id - Update an asset
exports.updateAsset = async (req, res) => {
  const { id } = req.params;
  const { name, type, quantity, base } = req.body;

  try {
    const updatedAsset = await Asset.findByIdAndUpdate(
      id,
      { name, type, quantity, base },
      { new: true }
    ).populate('base', 'name location');

    if (!updatedAsset) return res.status(404).json({ message: 'Asset not found' });

    // Log update
    await Log.create({
      action: 'Asset Update',
      details: `Updated asset ${updatedAsset.name} to quantity ${quantity}`,
      performedBy: req.user.id,
    });

    res.status(200).json(updatedAsset);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/assets/:id - Delete an asset
exports.deleteAsset = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAsset = await Asset.findByIdAndDelete(id);
    if (!deletedAsset) return res.status(404).json({ message: 'Asset not found' });

    // Log deletion
    await Log.create({
      action: 'Asset Deletion',
      details: `Deleted asset ${deletedAsset.name}`,
      performedBy: req.user.id,
    });

    res.status(200).json({ message: 'Asset deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
