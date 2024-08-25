const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accountHolderName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  ifsc: { type: String, required: true },
  deletedAt: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Bank', bankSchema);
