import { Request, Response } from 'express';
import { WalletModel } from '@/src/server/models/wallets/wallets';

export const getWallet = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('calling getWallet...');

    const { _id } = req.params;

    const wallet = await WalletModel.findById(_id);

    res.status(201).json({ wallet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
