const mongoose = require('mongoose');

const investorSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    email: { type: String, required: [true, 'Email is required'], trim: true, lowercase: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    investmentRange: { type: String, trim: true },
    interests: { type: String, trim: true },
    message: { type: String, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Investor', investorSchema);

