const Wallet = require('../models/Wallet');

// Get Wallet Balance & Transactions
exports.getWallet = async (req, res, next) => {
try {
  const wallet = await Wallet.findOne({ user: req.user.id, deletedAt: null });
  res.status(200).json(wallet);
}
catch (err) {
    next(err);
}
};

// Request Withdrawal
exports.withdraw = async (req, res, next) => {
try {
  const { amount } = req.body;

  const wallet = await Wallet.findOne({ user: req.user.id, deletedAt: null });

  if (wallet?.balance < amount) {
    return res.status(400).json({ message: 'Insufficient balance' });
  }

  wallet.balance -= amount;
  wallet.transactions.push({ type: 'debit', amount });
  await wallet.save();

  res.status(200).json({ message: 'Withdrawal request sent' });
}
catch (err) {
    next(err);
}
};
