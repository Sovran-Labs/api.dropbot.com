import { Request, Response } from 'express';
import { WalletAccountModel } from '@/src/server/models/walletAccounts/walletAccounts';

export const getWalletAccounts = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('calling getWalletAccounts...');

    const walletAccounts = await WalletAccountModel.find();

    res.status(201).json({ walletAccounts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
