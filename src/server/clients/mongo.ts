import mongoose from 'mongoose';

const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';
console.log(`Connecting to MongoDB at ${mongoUrl}`);

mongoose
  .connect(`${mongoUrl}/bot1`)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
