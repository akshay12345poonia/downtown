const Career = require('../models/Career.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.createCareer = catchAsync(async (req, res, next) => {
  const career = await Career.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Career job created successfully',
    data: { career }
  });
});

exports.getCareers = catchAsync(async (req, res, next) => {
  const query = {};

  // Default: show only active jobs unless ?all=true
  if (req.query.all !== 'true') query.isActive = true;

  if (req.query.department) query.department = { $regex: req.query.department, $options: 'i' };
  if (req.query.location) query.location = { $regex: req.query.location, $options: 'i' };
  if (req.query.type) query.type = req.query.type;

  const careers = await Career.find(query).sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: careers.length,
    data: { careers }
  });
});

exports.getCareer = catchAsync(async (req, res, next) => {
  const career = await Career.findById(req.params.id);

  if (!career) return next(new AppError('No career job found with this id', 404));

  res.status(200).json({
    status: 'success',
    data: { career }
  });
});

exports.updateCareer = catchAsync(async (req, res, next) => {
  const career = await Career.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!career) return next(new AppError('No career job found with this id', 404));

  res.status(200).json({
    status: 'success',
    message: 'Career job updated successfully',
    data: { career }
  });
});

exports.deleteCareer = catchAsync(async (req, res, next) => {
  const career = await Career.findByIdAndDelete(req.params.id);

  if (!career) return next(new AppError('No career job found with this id', 404));

  res.status(204).json({
    status: 'success',
    data: null
  });
});

