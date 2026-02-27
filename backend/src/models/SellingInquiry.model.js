const mongoose = require('mongoose');

const sellingInquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    email: { type: String, required: [true, 'Email is required'], trim: true, lowercase: true },
    phone: { type: String, trim: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
    message: { type: String, trim: true },
    preferredContactMethod: {
      type: String,
      enum: ['email', 'phone'],
      default: 'email'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('SellingInquiry', sellingInquirySchema);

