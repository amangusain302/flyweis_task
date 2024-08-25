const Nominee = require('../models/Nominee');

// Get Nominee
exports.getNominee = async (req, res, next) => {
try {
  const nominee = await Nominee.findOne({ user: req.user.id, deletedAt: null });
  res.status(200).json(nominee);
}
catch (err) {
    next(err);
}
};

// Add/Update Nominee
exports.addOrUpdateNominee = async (req, res, next) => {
try {
  const { name, relation, phone, email, aadhaar } = req.body;

  let nominee = await Nominee.findOne({ user: req.user.id });

  if (nominee) {
    nominee.name = name;
    nominee.relation = relation;
    nominee.phone = phone;
    nominee.email = email;
    nominee.aadhaar = aadhaar;
    nominee.deletedAt = null;
  } else {
    nominee = await Nominee.create({
      user: req.user.id,
      name,
      relation,
      phone,
      email,
      aadhaar,
    });
  }

  await nominee.save();
  res.status(200).json(nominee);
}
catch (err) {
    next(err);
}
};

// Soft Delete Nominee
exports.deleteNominee = async (req, res, next) => {
try {
  const nominee = await Nominee.findOneAndUpdate(
    { user: req.user.id },
    { deletedAt: new Date() },
    { new: true }
  );

  if (!nominee) {
    return res.status(404).json({ message: 'Nominee not found' });
  }

  res.status(200).json({ message: 'Nominee deleted' });
}
catch (err) {
    next(err);
}
};
