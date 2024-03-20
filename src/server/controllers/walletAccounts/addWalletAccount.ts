import { Request, Response } from 'express';
import { WalletAccountModel } from '@/src/server/models/walletAccounts/walletAccounts';

export const addWalletAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { accountName, account, pk, walletId, path } = req.body;

    const newWallet = new WalletAccountModel({
      accountName,
      account,
      pk,
      walletId,
      path,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await newWallet.save();

    res.status(201).json({ message: 'Wallet account added successfully', wallet: newWallet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
