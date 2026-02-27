const TeamMember = require('../models/TeamMember.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// Create team member
exports.createTeamMember = catchAsync(async (req, res, next) => {
  const member = await TeamMember.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Team member created successfully',
    data: { member }
  });
});

// Get all team members (optionally filter leadership)
exports.getTeam = catchAsync(async (req, res, next) => {
  const query = {};
  if (req.query.leadership === 'true') query.isLeadership = true;

  const team = await TeamMember.find(query).sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: team.length,
    data: { team }
  });
});

// Get single team member
exports.getTeamMember = catchAsync(async (req, res, next) => {
  const member = await TeamMember.findById(req.params.id);

  if (!member) return next(new AppError('No team member found with this id', 404));

  res.status(200).json({
    status: 'success',
    data: { member }
  });
});

// Update team member
exports.updateTeamMember = catchAsync(async (req, res, next) => {
  const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!member) return next(new AppError('No team member found with this id', 404));

  res.status(200).json({
    status: 'success',
    message: 'Team member updated successfully',
    data: { member }
  });
});

// Delete team member
exports.deleteTeamMember = catchAsync(async (req, res, next) => {
  const member = await TeamMember.findByIdAndDelete(req.params.id);

  if (!member) return next(new AppError('No team member found with this id', 404));

  res.status(204).json({
    status: 'success',
    data: null
  });
});

