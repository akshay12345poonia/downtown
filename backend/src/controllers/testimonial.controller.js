const Testimonial = require('../models/Testimonial.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// Create a new testimonial
exports.createTestimonial = catchAsync(async (req, res, next) => {
  const testimonial = await Testimonial.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Testimonial created successfully',
    data: { testimonial }
  });
});

// Get all testimonials (optionally limited for homepage)
exports.getTestimonials = catchAsync(async (req, res, next) => {
  const limit = req.query.limit ? Number(req.query.limit) : undefined;

  let query = Testimonial.find().sort('-createdAt');
  if (limit) query = query.limit(limit);

  const testimonials = await query;

  res.status(200).json({
    status: 'success',
    results: testimonials.length,
    data: { testimonials }
  });
});

// Delete testimonial (for admin use)
exports.deleteTestimonial = catchAsync(async (req, res, next) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

  if (!testimonial) {
    return next(new AppError('No testimonial found with this id', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

