const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected to ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error : ${error.message}`);
  }
};

module.exports = connectDB;
