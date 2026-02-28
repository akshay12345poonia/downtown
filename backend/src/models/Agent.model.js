const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Agent name is required'],
      trim: true
    },
    title: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      trim: true
    },
    bio: {
      type: String,
      trim: true
    },
    photo: {
      type: String
    },
    languages: [
      {
        type: String,
        trim: true
      }
    ],
    specialties: [
      {
        type: String,
        trim: true
      }
    ],
    socials: {
      website: String,
      linkedin: String,
      instagram: String,
      twitter: String
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Agent', agentSchema);

