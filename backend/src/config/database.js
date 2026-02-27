const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/downtown';
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`✅ Downtown Real Estate Database Connected: ${conn.connection.host}`);
        console.log(`🏘️  Ready to manage properties, agents, and client data`);
    } catch (error) {
        console.error(`❌ Downtown Database connection failed: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
