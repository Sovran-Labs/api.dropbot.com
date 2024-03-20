import { UUID } from 'mongodb';

export interface IWalletAccount {
  _id: UUID;
  accountName: string;
  account: string;
  pk: string;
  walletId?: UUID;
  path?: string;
  createdAt?: number;
  updatedAt?: number;
  schemaVersion?: string;
}
