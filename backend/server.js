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
  });
});

