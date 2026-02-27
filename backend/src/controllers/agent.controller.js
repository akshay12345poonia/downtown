const Agent = require('../models/Agent.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.createAgent = catchAsync(async (req, res, next) => {
  const agent = await Agent.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Agent created successfully',
    data: { agent }
  });
});

exports.getAgents = catchAsync(async (req, res, next) => {
  const query = {};

  if (req.query.active === 'false') query.isActive = false;
  if (req.query.active === 'true') query.isActive = true;

  if (req.query.search) {
    query.$or = [
      { name: { $regex: req.query.search, $options: 'i' } },
      { title: { $regex: req.query.search, $options: 'i' } }
    ];
  }

  const agents = await Agent.find(query).sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: agents.length,
    data: { agents }
  });
});

exports.getAgent = catchAsync(async (req, res, next) => {
  const agent = await Agent.findById(req.params.id);

  if (!agent) return next(new AppError('No agent found with this id', 404));

  res.status(200).json({
    status: 'success',
    data: { agent }
  });
});

exports.updateAgent = catchAsync(async (req, res, next) => {
  const agent = await Agent.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!agent) return next(new AppError('No agent found with this id', 404));

  res.status(200).json({
    status: 'success',
    message: 'Agent updated successfully',
    data: { agent }
  });
});

exports.deleteAgent = catchAsync(async (req, res, next) => {
  const agent = await Agent.findByIdAndDelete(req.params.id);

  if (!agent) return next(new AppError('No agent found with this id', 404));

  res.status(204).json({
    status: 'success',
    data: null
  });
});

