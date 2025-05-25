const Purchase = require('../models/Purchase');
const Log = require('../models/Log');
const Asset = require('../models/Asset');

// GET /api/purchases
exports.getPurchases = async (req, res) => {
  try {
    const { base, asset, date, type } = req.query;
    const filters = {};

    if (base) filters.base = base;
    if (asset) filters.asset = asset;
    if (date) filters.date = { $gte: new Date(date) };

    let query = Purchase.find(filters).populate('asset').populate('base');

    if (type && type !== 'All') {
      query = query.where('asset.type').equals(type);
    }

    const purchases = await query.exec();
    res.status(200).json(purchases);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// POST /api/purchases
exports.createPurchase = async (req, res) => {
  try {
    const { asset, quantity, base, date } = req.body;

    const assetDoc = await Asset.findById(asset);
    if (!assetDoc) return res.status(400).json({ message: 'Asset not found' });

    const purchase = await Purchase.create({
      asset,
      assetName: assetDoc.name,
      quantity,
      base,
      date,
    });

    await Log.create({
      action: 'Purchase',
      details: `Purchased ${quantity} units of asset ${assetDoc.name}`,
      performedBy: req.user?.id || 'System',
    });

    res.status(201).json(purchase);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
