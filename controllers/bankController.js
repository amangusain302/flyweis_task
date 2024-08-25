const Bank = require('../models/Bank');

// Get All Banks
exports.getBanks = async (req, res, next) => {
try {
  const banks = await Bank.find({ user: req.user.id, deletedAt: null });
  res.status(200).json(banks);
}
catch (err) {
    next(err);
}
};

// Add New Bank
exports.addBank = async (req, res, next) => {
try {
  const { accountHolderName, accountNumber, ifsc } = req.body;

  const bank = await Bank.create({
    user: req.user.id,
    accountHolderName,
    accountNumber,
    ifsc,
  });

  res.status(201).json(bank);
}
catch (err) {
    next(err);
}
};

// Update Bank
exports.updateBank = async (req, res, next) => {
try {
  const { id } = req.params;
  const { accountHolderName, accountNumber, ifsc } = req.body;

  const bank = await Bank.findOneAndUpdate(
    { _id: id, user: req.user.id, deletedAt: null },
    { accountHolderName, accountNumber, ifsc },
    { new: true }
  );

  if (!bank) {
    return res.status(404).json({ message: 'Bank not found' });
  }

  res.status(200).json(bank);
}
catch (err) {
    next(err);
}
};

// Soft Delete Bank
exports.deleteBank = async (req, res, next) => {
try {
  const { id } = req.params;

  const bank = await Bank.findOneAndUpdate(
    { _id: id, user: req.user.id },
    { deletedAt: new Date() },
    { new: true }
  );

  if (!bank) {
    return res.status(404).json({ message: 'Bank not found' });
  }

  res.status(200).json({ message: 'Bank deleted' });
}
catch (err) {
    next(err);
}
};
