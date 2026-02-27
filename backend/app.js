const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const requestLogger = require('./src/middleware/logger.middleware');
const { notFound, globalErrorHandler } = require('./src/middleware/error.middleware');
const authRoutes = require('./src/routes/auth.routes');
const propertyRoutes = require('./src/routes/property.routes');
const testimonialRoutes = require('./src/routes/testimonial.routes');
const agentRoutes = require('./src/routes/agent.routes');
const careerRoutes = require('./src/routes/career.routes');
const sellingRoutes = require('./src/routes/selling.routes');
const buyingRoutes = require('./src/routes/buying.routes');
const meetingRoutes = require('./src/routes/meeting.routes');
const teamRoutes = require('./src/routes/team.routes');
const investorRoutes = require('./src/routes/investor.routes');
const contactRoutes = require('./src/routes/contact.routes');

const app = express();

// Global middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Mount routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/properties', propertyRoutes);
app.use('/api/v1/testimonials', testimonialRoutes);
app.use('/api/v1/agents', agentRoutes);
app.use('/api/v1/careers', careerRoutes);
app.use('/api/v1/selling', sellingRoutes);
app.use('/api/v1/buying', buyingRoutes);
app.use('/api/v1/meetings', meetingRoutes);
app.use('/api/v1/team', teamRoutes);
app.use('/api/v1/investors', investorRoutes);
app.use('/api/v1/contacts', contactRoutes);

// 404 + error handlers
app.use(notFound);
app.use(globalErrorHandler);

module.exports = app;

