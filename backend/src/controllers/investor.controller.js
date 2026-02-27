const Investor = require('../models/Investor.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.createInvestor = catchAsync(async (req, res, next) => {
  const investor = await Investor.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Investor enquiry submitted successfully',
    data: { investor }
  });
});

exports.getInvestors = catchAsync(async (req, res, next) => {
  const investors = await Investor.find().sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: investors.length,
    data: { investors }
  });
});

exports.getInvestor = catchAsync(async (req, res, next) => {
  const investor = await Investor.findById(req.params.id);

  if (!investor) return next(new AppError('No investor enquiry found with this id', 404));

  res.status(200).json({
    status: 'success',
    data: { investor }
  });
});

exports.deleteInvestor = catchAsync(async (req, res, next) => {
  const investor = await Investor.findByIdAndDelete(req.params.id);

  if (!investor) return next(new AppError('No investor enquiry found with this id', 404));

  res.status(204).json({
    status: 'success',
    data: null
  });
});

