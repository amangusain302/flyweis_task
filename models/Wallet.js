const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, default: 0 },
  transactions: [
    {
      type: { type: String, enum: ['credit', 'debit'], required: true },
      amount: { type: Number, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
  deletedAt: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Wallet', walletSchema);
