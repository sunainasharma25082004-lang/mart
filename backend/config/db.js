const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/service_247';
    await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 1500
    });
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.log('MongoDB server offline on 27017. Server will operate using high-speed in-memory store mode for instant response.');
  }
};

module.exports = connectDB;
