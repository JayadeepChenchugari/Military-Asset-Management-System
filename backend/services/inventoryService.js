const mongoose = require('mongoose');
const Base = require('../models/Base');

async function updateInventoryOnTransfer(assetId, quantity, fromBaseId, toBaseId) {
  const assetObjId = new mongoose.Types.ObjectId(assetId);
const fromBaseObjId = new mongoose.Types.ObjectId(fromBaseId);
const toBaseObjId = new mongoose.Types.ObjectId(toBaseId);


  const decrementResult = await Base.updateOne(
    { _id: fromBaseObjId, "assets.asset": assetObjId },
    { $inc: { "assets.$.quantity": -quantity } }
  );
  console.log('Decrement result:', decrementResult);

  const toBaseHasAsset = await Base.findOne({ _id: toBaseObjId, "assets.asset": assetObjId });
  console.log('To base has asset:', !!toBaseHasAsset);

  if (toBaseHasAsset) {
    const incrementResult = await Base.updateOne(
      { _id: toBaseObjId, "assets.asset": assetObjId },
      { $inc: { "assets.$.quantity": quantity } }
    );
    console.log('Increment result:', incrementResult);
  } else {
    const pushResult = await Base.updateOne(
      { _id: toBaseObjId },
      { $push: { assets: { asset: assetObjId, quantity: quantity } } }
    );
    console.log('Push new asset result:', pushResult);
  }
}

module.exports = { updateInventoryOnTransfer };
