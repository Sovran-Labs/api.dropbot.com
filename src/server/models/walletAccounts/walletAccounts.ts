import mongoose, { Document, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { IWalletAccount } from '@/src/server/ts/interfaces/walletAccounts';

const WalletAccountSchema = new Schema<IWalletAccount & Document>({
  accountName: String,
  account: {
    type: String,
    unique: true,
  },
  pk: String,
  walletId: Schema.Types.ObjectId,
  path: String,
  createdAt: Number,
  updatedAt: Number,
  schemaVersion: {
    type: String,
    default: '1.0.0',
  },
});

WalletAccountSchema.plugin(uniqueValidator);

export const WalletAccountModel = mongoose.model<IWalletAccount & Document>('WalletAccount', WalletAccountSchema);
