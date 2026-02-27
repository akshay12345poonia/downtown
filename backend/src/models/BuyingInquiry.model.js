const mongoose = require('mongoose');

const buyingInquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    email: { type: String, required: [true, 'Email is required'], trim: true, lowercase: true },
    phone: { type: String, trim: true },
    desiredLocation: { type: String, trim: true },
    budgetMin: { type: Number },
    budgetMax: { type: Number },
    propertyType: { type: String, trim: true },
    message: { type: String, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('BuyingInquiry', buyingInquirySchema);

