import { Request, Response } from 'express';
import { WalletModel } from '@/src/server/models/wallets/wallets';

export const getWallets = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('calling getWallets...');

    const wallets = await WalletModel.find();

    res.status(201).json({ wallets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
