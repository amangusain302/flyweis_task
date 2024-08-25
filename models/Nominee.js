const mongoose = require('mongoose');

const nomineeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  relation: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  aadhaar: { type: String, required: true },
  deletedAt: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Nominee', nomineeSchema);
