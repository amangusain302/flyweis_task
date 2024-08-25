const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  name: { type: String, default: 'Dummy Name' },
  profilePhoto: { type: String, default: '' },
  otp: { type: String },
  isKycCompleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
