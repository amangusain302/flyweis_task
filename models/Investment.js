const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, enum: ["Stocks", "Bonds", "Mutual Funds"] },
    amountInvested: { type: Number, required: true },
    currentValue: { type: Number, required: true },
    deletedAt: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Investment', investmentSchema);
