import { UUID } from 'mongodb';

export interface IWallet {
  _id?: UUID;
  walletName: string;
  mnemonic: string;
  createdAt: number;
  updatedAt: number;
}
