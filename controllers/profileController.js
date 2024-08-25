const User = require('../models/User');

// Get Profile
exports.getProfile = async (req, res, next) => {
try {
  const user = await User.findById(req.user.id);
  res.status(200).json(user);
}
catch (err) {
    next(err);
}
};

// Update Profile
exports.updateProfile = async (req, res, next) => {
try {
  const { name, profilePhoto } = req.body;
  const user = await User.findById(req.user.id);

  if (name) user.name = name;
  if (profilePhoto) user.profilePhoto = profilePhoto;

  await user.save();
  res.status(200).json(user);
}
catch (err) {
    next(err);
}
};
