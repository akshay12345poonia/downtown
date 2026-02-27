const Property = require('../models/Property.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// Create a new property
exports.createProperty = catchAsync(async (req, res, next) => {
  const property = await Property.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Property created successfully',
    data: { property }
  });
});

// Get all properties with basic filters
exports.getProperties = catchAsync(async (req, res, next) => {
  const queryObj = {};

  if (req.query.location) queryObj.location = { $regex: req.query.location, $options: 'i' };
  if (req.query.status) queryObj.status = req.query.status;
  if (req.query.minPrice || req.query.maxPrice) {
    queryObj.price = {};
    if (req.query.minPrice) queryObj.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) queryObj.price.$lte = Number(req.query.maxPrice);
  }

  const properties = await Property.find(queryObj).sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: properties.length,
    data: { properties }
  });
});

// Get single property by id
exports.getProperty = catchAsync(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(new AppError('No property found with this id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { property }
  });
});

// Update property
exports.updateProperty = catchAsync(async (req, res, next) => {
  const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!property) {
    return next(new AppError('No property found with this id', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Property updated successfully',
    data: { property }
  });
});

// Delete property
exports.deleteProperty = catchAsync(async (req, res, next) => {
  const property = await Property.findByIdAndDelete(req.params.id);

  if (!property) {
    return next(new AppError('No property found with this id', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

