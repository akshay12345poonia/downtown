const Property = require('../models/Property.model');
const Agent = require('../models/Agent.model');
const User = require('../models/User.model');
const catchAsync = require('../utils/catchAsync');

exports.getAdminStats = catchAsync(async (req, res, next) => {
    const [
        totalProperties,
        availableProperties,
        soldProperties,
        rentedProperties,
        totalAgents,
        activeAgents,
        totalUsers
    ] = await Promise.all([
        Property.countDocuments(),
        Property.countDocuments({ status: 'available' }),
        Property.countDocuments({ status: 'sold' }),
        Property.countDocuments({ status: 'rented' }),
        Agent.countDocuments(),
        Agent.countDocuments({ isActive: true }),
        User.countDocuments()
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
                total: totalUsers
            }
        }
    });
});
