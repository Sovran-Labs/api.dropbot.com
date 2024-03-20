import mongoose, { Document, Schema } from 'mongoose';
import { IMasterKey } from './keys.interface';

const MasterKeySchema = new Schema<IMasterKey & Document>({
  mnemonic: String,
  path: String,
  publicKey: String,
  privateKey: String,
  createdAt: Number,
});

const MasterKeyModel = mongoose.model<IMasterKey & Document>('MasterKey', MasterKeySchema);

export default MasterKeyModel;
