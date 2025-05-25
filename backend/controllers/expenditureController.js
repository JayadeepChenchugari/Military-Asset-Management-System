const Expenditure = require('../models/Expenditure');
const Log = require('../models/Log');

// GET /api/expenditures
exports.getExpenditures = async (req, res) => {
  try {
    const expenditures = await Expenditure.find().populate('asset').populate('base');
    res.status(200).json(expenditures);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/expenditures
exports.createExpenditure = async (req, res) => {
  try {
    const { asset, quantity, base, date } = req.body;
    const expenditure = await Expenditure.create({ asset, quantity, base, date });

    await Log.create({
      action: 'Expenditure',
      details: `Expended ${quantity} units of asset ${asset}`,
      performedBy: req.user.id,
    });

    res.status(201).json(expenditure);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
// GET /api/expenditures/:id - Get expenditure by ID
exports.getExpenditureById = async (req, res) => {
  try {
    const expenditure = await Expenditure.findById(req.params.id)
      .populate('asset')
      .populate('base');

    if (!expenditure) {
      return res.status(404).json({ message: 'Expenditure not found' });
    }

    res.status(200).json(expenditure);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
