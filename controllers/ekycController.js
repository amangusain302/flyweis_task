const KYC = require('../models/KYC');

// Get KYC Details
exports.getKyc = async (req, res, next) => {
try {
  const kyc = await KYC.findOne({ user: req.user.id, deletedAt: null });
  res.status(200).json(kyc);
}
catch (err) {
    next(err);
}
};

// Update KYC
exports.updateKyc = async (req, res, next) => {
try {
  const { aadhaar, pan, dob, gender, address, occupation } = req.body;

  let kyc = await KYC.findOne({ user: req.user.id });

  if (kyc) {
    kyc.aadhaar = aadhaar;
    kyc.pan = pan;
    kyc.dob = dob;
    kyc.gender = gender;
    kyc.address = address;
    kyc.occupation = occupation;
    kyc.deletedAt = null;
  } else {
    kyc = await KYC.create({
      user: req.user.id,
      aadhaar,
      pan,
      dob,
      gender,
      address,
      occupation,
    });
  }

  await kyc.save();
  res.status(200).json(kyc);
}
catch (err) {
    next(err);
}
};
