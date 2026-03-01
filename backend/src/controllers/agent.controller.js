const Agent = require('../models/Agent.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const getPhotoUrl = (req) => {
  if (req.file) return `/uploads/${req.file.filename}`;
  if (req.body.photo) return req.body.photo;
  return undefined;
};

exports.createAgent = catchAsync(async (req, res, next) => {
  const photoUrl = getPhotoUrl(req);
  const agentData = { ...req.body };
  if (photoUrl !== undefined) agentData.photo = photoUrl;

  // Parse array fields if they come as comma-separated strings
  if (typeof agentData.languages === 'string')
    agentData.languages = agentData.languages.split(',').map(s => s.trim()).filter(Boolean);
  if (typeof agentData.specialties === 'string')
    agentData.specialties = agentData.specialties.split(',').map(s => s.trim()).filter(Boolean);
  if (typeof agentData.socials === 'string') {
    try { agentData.socials = JSON.parse(agentData.socials); } catch { delete agentData.socials; }
  }

  const agent = await Agent.create(agentData);

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
  const updateData = { ...req.body };
  const photoUrl = getPhotoUrl(req);
  if (photoUrl !== undefined) updateData.photo = photoUrl;

  if (typeof updateData.languages === 'string')
    updateData.languages = updateData.languages.split(',').map(s => s.trim()).filter(Boolean);
  if (typeof updateData.specialties === 'string')
    updateData.specialties = updateData.specialties.split(',').map(s => s.trim()).filter(Boolean);
  if (typeof updateData.socials === 'string') {
    try { updateData.socials = JSON.parse(updateData.socials); } catch { delete updateData.socials; }
  }

  const agent = await Agent.findByIdAndUpdate(req.params.id, updateData, {
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
