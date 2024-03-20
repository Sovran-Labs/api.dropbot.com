import { Request, Response } from 'express';
import { WalletAccountModel } from '@/src/server/models/walletAccounts/walletAccounts';

export const deleteWalletAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { account } = req.body;

    await WalletAccountModel.deleteOne({
      account,
    });

    res.status(201).json({ message: 'Wallet account deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
