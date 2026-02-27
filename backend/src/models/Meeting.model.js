const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    email: { type: String, required: [true, 'Email is required'], trim: true, lowercase: true },
    phone: { type: String, trim: true },
    subject: { type: String, trim: true },
    notes: { type: String, trim: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
    scheduledAt: { type: Date, required: [true, 'Meeting date/time is required'] },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Meeting', meetingSchema);

