import { Request, Response } from 'express';
import { WalletModel } from '@/src/server/models/wallets/wallets';

export const deleteWallet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { account } = req.body;

    await WalletModel.deleteOne({
      account,
    });

    res.status(201).json({ message: 'Wallet deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
