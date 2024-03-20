import mongoose, { Document, Schema } from 'mongoose';
import { ICapital, IUser } from './user.interface';

const CapitalSchema = new Schema<ICapital>({
  initial: String,
  additional: String,
  total: String,
});

const UserSchema = new Schema<IUser & Document>({
  eoa: String,
  capital: {
    type: CapitalSchema,
    required: true,
  },
  name: String,
  ownershipPercentage: String,
});

const UserModel = mongoose.model<IUser & Document>('User', UserSchema);

export { CapitalSchema, UserModel };
