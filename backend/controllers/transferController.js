const Transfer = require('../models/Transfer');
const Log = require('../models/Log');
const { updateInventoryOnTransfer } = require('../services/inventoryService');
// GET /api/transfers - Retrieve transfers with filters
exports.getTransfers = async (req, res) => {
  try {
    const { fromBase, toBase, asset } = req.query;
    const filters = {};
    if (fromBase) filters.fromBase = fromBase;
    if (toBase) filters.toBase = toBase;
    if (asset) filters.asset = asset;

    const transfers = await Transfer.find(filters)
      .populate('fromBase')
      .populate('toBase')
      .populate('asset');
    res.status(200).json(transfers);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/transfers/:id - Retrieve a transfer by ID
exports.getTransferById = async (req, res) => {
  try {
    const transfer = await Transfer.findById(req.params.id)
      .populate('fromBase')
      .populate('toBase')
      .populate('asset');

    if (!transfer) {
      return res.status(404).json({ message: 'Transfer not found' });
    }

    res.status(200).json(transfer);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/transfers - Create new transfer
exports.createTransfer = async (req, res) => {
  try {
    let { asset, quantity, fromBase, toBase, date } = req.body;

    quantity = Number(quantity); // Ensure quantity is a number

    console.log('Received transfer:', { asset, quantity, fromBase, toBase, date });
    console.log('User:', req.user); // Log user for debug

    // Create the transfer record
    const transfer = await Transfer.create({ asset, quantity, fromBase, toBase, date });

    // Update asset quantities on the bases
    await updateInventoryOnTransfer(asset, quantity, fromBase, toBase);

    // Log the transfer action with valid enum value for 'action'
    await Log.create({
      action: 'Transfer', // Use the correct enum value for your Log schema
      details: `Transferred ${quantity} units of asset ${asset} from ${fromBase} to ${toBase}`,
      performedBy: req.user?.id || 'Unknown',
    });

    res.status(201).json(transfer);
  } catch (err) {
    console.error('[❌ Transfer Create Error]', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

