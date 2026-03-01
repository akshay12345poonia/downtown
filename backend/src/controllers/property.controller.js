const Property = require('../models/Property.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// Build image URLs from uploaded files
const getImageUrls = (req) => {
  if (req.files && req.files.length > 0) {
    return req.files.map(f => `/uploads/${f.filename}`);
  }
  return null;
};

// Create a new property
exports.createProperty = catchAsync(async (req, res, next) => {
  const propertyData = { ...req.body };
  const imageUrls = getImageUrls(req);
  if (imageUrls) propertyData.images = imageUrls;

  // Set the listedBy field to the currently logged-in user
  if (req.user) propertyData.listedBy = req.user._id;

  // Parse numeric fields when coming from FormData
  if (propertyData.price) propertyData.price = Number(propertyData.price);
  if (propertyData.bedrooms) propertyData.bedrooms = Number(propertyData.bedrooms);
  if (propertyData.bathrooms) propertyData.bathrooms = Number(propertyData.bathrooms);
  if (propertyData.area) propertyData.area = Number(propertyData.area);
  if (propertyData.featured) propertyData.featured = propertyData.featured === 'true';

  const property = await Property.create(propertyData);

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
  if (req.query.type) queryObj.type = req.query.type;
  if (req.query.propertyType) queryObj.propertyType = req.query.propertyType;
  if (req.query.minPrice || req.query.maxPrice) {
    queryObj.price = {};
    if (req.query.minPrice) queryObj.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) queryObj.price.$lte = Number(req.query.maxPrice);
  }
  // Seller can filter their own listings
  if (req.query.myListings && req.user) {
    queryObj.listedBy = req.user._id;
  }

  const properties = await Property.find(queryObj)
    .populate('listedBy', 'name email role')
    .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: properties.length,
    data: { properties }
  });
});

// Get single property by id
exports.getProperty = catchAsync(async (req, res, next) => {
  const property = await Property.findById(req.params.id).populate('listedBy', 'name email role');

  if (!property) {
    return next(new AppError('No property found with this id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { property }
  });
});

// Update property (admin or owner)
exports.updateProperty = catchAsync(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) return next(new AppError('No property found with this id', 404));

  // Only admin or the seller who listed it can update
  if (req.user.role !== 'admin' && String(property.listedBy) !== String(req.user._id)) {
    return next(new AppError('You do not have permission to update this property', 403));
  }

  const updateData = { ...req.body };
  const imageUrls = getImageUrls(req);
  if (imageUrls) updateData.images = imageUrls;

  if (updateData.price) updateData.price = Number(updateData.price);
  if (updateData.bedrooms) updateData.bedrooms = Number(updateData.bedrooms);
  if (updateData.bathrooms) updateData.bathrooms = Number(updateData.bathrooms);
  if (updateData.area) updateData.area = Number(updateData.area);
  if (updateData.featured) updateData.featured = updateData.featured === 'true';

  const updated = await Property.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    message: 'Property updated successfully',
    data: { property: updated }
  });
});

// Delete property (admin or owner)
exports.deleteProperty = catchAsync(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) return next(new AppError('No property found with this id', 404));

  if (req.user.role !== 'admin' && String(property.listedBy) !== String(req.user._id)) {
    return next(new AppError('You do not have permission to delete this property', 403));
  }

  await Property.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});
