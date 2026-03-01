const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Property title is required'],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Price is required']
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    bedrooms: {
      type: Number,
      default: 0
    },
    bathrooms: {
      type: Number,
      default: 0
    },
    area: {
      type: Number,
      default: 0
    },
    images: [
      {
        type: String
      }
    ],
    status: {
      type: String,
      enum: ['available', 'sold', 'rented'],
      default: 'available'
    },
    type: {
      type: String,
      enum: ['for-sale', 'for-rent'],
      default: 'for-sale'
    },
    propertyType: {
      type: String,
      enum: ['house', 'apartment', 'villa', 'land', 'commercial'],
      default: 'house'
    },
    featured: {
      type: Boolean,
      default: false
    },
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agent'
    },
    listedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Property', propertySchema);
