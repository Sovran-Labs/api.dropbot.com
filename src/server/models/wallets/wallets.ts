import mongoose, { Document, Schema } from 'mongoose';

import { IWallet } from '@/src/server/ts/interfaces/wallet';

const WalletSchema = new Schema<IWallet & Document>({
  walletName: String,
  mnemonic: String,
  createdAt: Number,
  updatedAt: Number,
});

export const WalletModel = mongoose.model<IWallet & Document>('Wallet', WalletSchema);
