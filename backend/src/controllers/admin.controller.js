const Property = require('../models/Property.model');
const Agent = require('../models/Agent.model');
const User = require('../models/User.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAdminStats = catchAsync(async (req, res, next) => {
    const [
        totalProperties,
        availableProperties,
        soldProperties,
        rentedProperties,
        totalAgents,
        activeAgents,
        totalUsers,
        sellers,
        buyers
    ] = await Promise.all([
        Property.countDocuments(),
        Property.countDocuments({ status: 'available' }),
        Property.countDocuments({ status: 'sold' }),
        Property.countDocuments({ status: 'rented' }),
        Agent.countDocuments(),
        Agent.countDocuments({ isActive: true }),
        User.countDocuments(),
        User.countDocuments({ role: 'seller' }),
        User.countDocuments({ role: 'buyer' })
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            properties: {
                total: totalProperties,
                available: availableProperties,
                sold: soldProperties,
                rented: rentedProperties
            },
            agents: {
                total: totalAgents,
                active: activeAgents
            },
            users: {
                total: totalUsers,
                sellers,
                buyers
            }
        }
    });
});

// List all users (admin only)
exports.getUsers = catchAsync(async (req, res, next) => {
    const query = {};
    if (req.query.role) query.role = req.query.role;

    const users = await User.find(query).select('-password').sort('-createdAt');

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: { users }
    });
});

// Change a user's role (admin only)
exports.updateUserRole = catchAsync(async (req, res, next) => {
    const { role } = req.body;
    const allowedRoles = ['buyer', 'seller', 'agent', 'admin'];

    if (!role || !allowedRoles.includes(role)) {
        return next(new AppError(`Invalid role. Must be one of: ${allowedRoles.join(', ')}`, 400));
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true, runValidators: true }
    ).select('-password');

    if (!user) return next(new AppError('No user found with this id', 404));

    res.status(200).json({
        status: 'success',
        message: `User role updated to ${role}`,
        data: { user }
    });
});
