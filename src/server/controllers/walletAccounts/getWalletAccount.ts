import { Request, Response } from 'express';
import { WalletAccountModel } from '@/src/server/models/walletAccounts/walletAccounts';

export const getWalletAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('calling getWalletAccount...');

    // debugger;

    const { _id } = req.params;

    const walletAccount = await WalletAccountModel.findById(_id);

    res.status(201).json({ walletAccount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
