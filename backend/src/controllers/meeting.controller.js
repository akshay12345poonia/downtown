const Meeting = require('../models/Meeting.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// Book a new meeting (online booking)
exports.createMeeting = catchAsync(async (req, res, next) => {
  const meeting = await Meeting.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Meeting scheduled successfully',
    data: { meeting }
  });
});

// Get all meetings (for admin/agent calendar)
exports.getMeetings = catchAsync(async (req, res, next) => {
  const query = {};

  if (req.query.status) query.status = req.query.status;

  const meetings = await Meeting.find(query).sort('scheduledAt');

  res.status(200).json({
    status: 'success',
    results: meetings.length,
    data: { meetings }
  });
});

// Get a single meeting
exports.getMeeting = catchAsync(async (req, res, next) => {
  const meeting = await Meeting.findById(req.params.id);

  if (!meeting) return next(new AppError('No meeting found with this id', 404));

  res.status(200).json({
    status: 'success',
    data: { meeting }
  });
});

// Update meeting (e.g. change status or time)
exports.updateMeeting = catchAsync(async (req, res, next) => {
  const meeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!meeting) return next(new AppError('No meeting found with this id', 404));

  res.status(200).json({
    status: 'success',
    message: 'Meeting updated successfully',
    data: { meeting }
  });
});

// Cancel/delete meeting
exports.deleteMeeting = catchAsync(async (req, res, next) => {
  const meeting = await Meeting.findByIdAndDelete(req.params.id);

  if (!meeting) return next(new AppError('No meeting found with this id', 404));

  res.status(204).json({
    status: 'success',
    data: null
  });
});

