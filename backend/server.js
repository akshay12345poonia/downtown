const dotenv = require('dotenv');
const connectDB = require('./src/config/database');

dotenv.config();

const app = require('./app');

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`Signup endpoint: POST http://localhost:${PORT}/api/v1/auth/signup`);
    console.log(`Login endpoint:  POST http://localhost:${PORT}/api/v1/auth/login`);
    console.log(`Properties:      http://localhost:${PORT}/api/v1/properties`);
    console.log(`Testimonials:    http://localhost:${PORT}/api/v1/testimonials`);
    console.log(`Agents:          http://localhost:${PORT}/api/v1/agents`);
    console.log(`Careers:         http://localhost:${PORT}/api/v1/careers`);
    console.log(`Selling:         http://localhost:${PORT}/api/v1/selling`);
    console.log(`Buying:          http://localhost:${PORT}/api/v1/buying`);
    console.log(`Meetings:        http://localhost:${PORT}/api/v1/meetings`);
    console.log(`Team:            http://localhost:${PORT}/api/v1/team`);
    console.log(`Investors:       http://localhost:${PORT}/api/v1/investors`);
    console.log(`Contacts:        http://localhost:${PORT}/api/v1/contacts`);
  });
});

