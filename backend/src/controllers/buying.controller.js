const BuyingInquiry = require('../models/BuyingInquiry.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// Create buying inquiry (buying a property)
exports.createBuyingInquiry = catchAsync(async (req, res, next) => {
  const inquiry = await BuyingInquiry.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Buying inquiry submitted successfully',
    data: { inquiry }
  });
});

// List buying inquiries (for admin/agent dashboard)
exports.getBuyingInquiries = catchAsync(async (req, res, next) => {
  const inquiries = await BuyingInquiry.find().sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: inquiries.length,
    data: { inquiries }
  });
});

// Get single buying inquiry
exports.getBuyingInquiry = catchAsync(async (req, res, next) => {
  const inquiry = await BuyingInquiry.findById(req.params.id);

  if (!inquiry) return next(new AppError('No buying inquiry found with this id', 404));

  res.status(200).json({
    status: 'success',
    data: { inquiry }
  });
});

// Delete buying inquiry
exports.deleteBuyingInquiry = catchAsync(async (req, res, next) => {
  const inquiry = await BuyingInquiry.findByIdAndDelete(req.params.id);

  if (!inquiry) return next(new AppError('No buying inquiry found with this id', 404));

  res.status(204).json({
    status: 'success',
    data: null
  });
});

