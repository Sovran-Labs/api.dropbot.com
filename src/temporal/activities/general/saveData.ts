// activities.js
import { connectDB, disconnectDB } from '../../clients/db';

export const saveData = async (data: any) => {
  await connectDB();

  // Perform database operations
  // For example, insert data into a collection
  // await db.collection('yourCollection').insertOne(data);

  await disconnectDB();
};
