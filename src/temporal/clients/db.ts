import mongoose from 'mongoose';

const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';

export const connectDB = async () => {
  try {
    await mongoose.connect(`${mongoUrl}/bot1`);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection error:', error);
    // process.exit(1);
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
};
