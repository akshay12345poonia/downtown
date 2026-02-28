const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    role: { type: String, required: [true, 'Role is required'], trim: true },
    bio: { type: String, trim: true },
    photo: { type: String },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    socials: {
      website: String,
      linkedin: String,
      instagram: String,
      twitter: String
    },
    isLeadership: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('TeamMember', teamMemberSchema);

