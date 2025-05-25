
const Transfer = require('../models/Transfer');
const Purchase = require('../models/Purchase'); 
const Asset = require('../models/Asset');
const Log = require('../models/Log'); 
const Base = require('../models/Base');
const Assignment = require('../models/Assignment');

const Expenditure = require('../models/Expenditure');



const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};


const safeString = (str) => (typeof str === 'string' && str.trim() !== '' ? str.trim() : undefined);

exports.getDashboardSummary = async (req, res) => {
  try {
    const { base, equipmentType, date } = req.query;

    const safeBase = safeString(base);
    const safeEquipmentType = safeString(equipmentType);
    const safeDate = safeString(date);
    const dateObj = safeDate ? new Date(safeDate) : null;
    const hasValidDate = isValidDate(dateObj);

    const openingBalanceQuery = {
      ...(safeBase && { base: safeBase }),
      ...(safeEquipmentType && { type: safeEquipmentType }),
      ...(hasValidDate && { createdAt: { $lt: dateObj } }),
    };

    const closingBalanceQuery = {
      ...(safeBase && { base: safeBase }),
      ...(safeEquipmentType && { type: safeEquipmentType }),
      ...(hasValidDate && { createdAt: { $lte: dateObj } }),
    };

    const assignedQuery = {
      ...(safeBase && { base: safeBase }),
      ...(safeEquipmentType && { equipmentType: safeEquipmentType }),
      ...(hasValidDate && { assignedAt: { $lte: dateObj } }),
    };

    const expendedQuery = {
      ...(safeBase && { base: safeBase }),
      ...(safeEquipmentType && { equipmentType: safeEquipmentType }),
      ...(hasValidDate && { expendedAt: { $lte: dateObj } }),
    };

    // Step 1: Resolve base ID
    let baseId = null;
    if (safeBase) {
      const baseDoc = await Base.findOne({ name: safeBase });
      if (baseDoc) baseId = baseDoc._id;
    }

    // Step 2: Asset filter for equipmentType
    let assetFilter = {};
    if (safeEquipmentType) {
      const assets = await Asset.find({ type: safeEquipmentType }).select('_id');
      assetFilter.asset = { $in: assets.map((a) => a._id) };
    }

    const dateFilter = hasValidDate ? { date: { $lte: dateObj } } : {};

    // Purchases
    const purchasesAgg = await Purchase.aggregate([
      {
        $match: {
          ...assetFilter,
          ...dateFilter,
          ...(baseId && { base: baseId }),
        },
      },
      { $group: { _id: null, total: { $sum: '$quantity' } } },
    ]);

    const purchases = purchasesAgg[0]?.total || 0;

    // Transfer In
    const transferInAgg = await Transfer.aggregate([
      {
        $match: {
          ...assetFilter,
          ...dateFilter,
          ...(baseId && { toBase: baseId }),
        },
      },
      { $group: { _id: null, total: { $sum: '$quantity' } } },
    ]);

    const transferIn = transferInAgg[0]?.total || 0;

    // Transfer Out
    const transferOutAgg = await Transfer.aggregate([
      {
        $match: {
          ...assetFilter,
          ...dateFilter,
          ...(baseId && { fromBase: baseId }),
        },
      },
      { $group: { _id: null, total: { $sum: '$quantity' } } },
    ]);

    const transferOut = transferOutAgg[0]?.total || 0;

    // Totals
    const [openingBalance, closingBalance, assigned, expended] = await Promise.all([
      Asset.countDocuments(openingBalanceQuery),
      Asset.countDocuments(closingBalanceQuery),
      Assignment.countDocuments(assignedQuery),
      Expenditure.countDocuments(expendedQuery),
    ]);

    const netMovement = purchases + transferIn - transferOut;

    res.json({
      openingBalance,
      closingBalance,
      netMovement,
      assigned,
      expended,
      purchases,
      transferIn,
      transferOut,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Server error fetching dashboard data' });
  }
};



exports.getNetMovementDetails = async (req, res) => {
  try {
    const { base, equipmentType, date } = req.query;

    const dateFilter = date ? { date: { $lte: new Date(date) } } : {};

    // 🔄 Resolve base name to base ID if base is provided
    let baseId = null;
    if (base) {
      const baseDoc = await Base.findOne({ name: base });
      if (baseDoc) {
        baseId = baseDoc._id;
      } else {
        return res.status(400).json({ message: "Base not found" });
      }
    }

    // 🎯 Equipment type filtering
    let assetFilter = {};
    if (equipmentType) {
      const assets = await Asset.find({ type: equipmentType }).select('_id');
      assetFilter.asset = { $in: assets.map(a => a._id) };
    }

    // 🎯 Purchases
    const purchases = await Purchase.aggregate([
      {
        $match: {
          ...assetFilter,
          ...dateFilter,
          base: baseId ? baseId : { $exists: true }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$quantity' }
        }
      }
    ]);

    // 🎯 Transfer In
    const transferIn = await Transfer.aggregate([
      {
        $match: {
          ...assetFilter,
          ...dateFilter,
          toBase: baseId ? baseId : { $exists: true }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$quantity' }
        }
      }
    ]);

    // 🎯 Transfer Out
    const transferOut = await Transfer.aggregate([
      {
        $match: {
          ...assetFilter,
          ...dateFilter,
          fromBase: baseId ? baseId : { $exists: true }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$quantity' }
        }
      }
    ]);

    // 🧮 Compute net movement
    const purchaseQty = purchases[0]?.total || 0;
    const inQty = transferIn[0]?.total || 0;
    const outQty = transferOut[0]?.total || 0;

    const netMovement = purchaseQty + inQty - outQty;

    res.json({
      purchases: purchaseQty,
      transferIn: inQty,
      transferOut: outQty,
      netMovement,
    });

  } catch (err) {
    console.error('❌ Error getting net movement details:', err);
    res.status(500).json({ message: 'Failed to get net movement details' });
  }
};

