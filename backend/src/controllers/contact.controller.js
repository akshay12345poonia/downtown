const Contact = require('../models/Contact.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// Submit contact form
exports.createContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Contact message submitted successfully',
    data: { contact }
  });
});

// List all contact messages
exports.getContacts = catchAsync(async (req, res, next) => {
  const contacts = await Contact.find().sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: contacts.length,
    data: { contacts }
  });
});

// Get single contact message
exports.getContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) return next(new AppError('No contact message found with this id', 404));

  res.status(200).json({
    status: 'success',
    data: { contact }
  });
});

// Delete contact message
exports.deleteContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);

  if (!contact) return next(new AppError('No contact message found with this id', 404));

  res.status(204).json({
    status: 'success',
    data: null
  });
});

