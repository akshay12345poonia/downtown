const SellingInquiry = require('../models/SellingInquiry.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// Create selling inquiry (selling a property)
exports.createSellingInquiry = catchAsync(async (req, res, next) => {
  const inquiry = await SellingInquiry.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Selling inquiry submitted successfully',
    data: { inquiry }
  });
});

// List selling inquiries (for admin/agent dashboard)
exports.getSellingInquiries = catchAsync(async (req, res, next) => {
  const inquiries = await SellingInquiry.find().sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: inquiries.length,
    data: { inquiries }
  });
});

// Get single selling inquiry
exports.getSellingInquiry = catchAsync(async (req, res, next) => {
  const inquiry = await SellingInquiry.findById(req.params.id);

  if (!inquiry) return next(new AppError('No selling inquiry found with this id', 404));

  res.status(200).json({
    status: 'success',
    data: { inquiry }
  });
});

// Delete selling inquiry
exports.deleteSellingInquiry = catchAsync(async (req, res, next) => {
  const inquiry = await SellingInquiry.findByIdAndDelete(req.params.id);

  if (!inquiry) return next(new AppError('No selling inquiry found with this id', 404));

  res.status(204).json({
    status: 'success',
    data: null
  });
});

