import { Request, Response } from 'express';
import { WalletModel } from '@/src/server/models/wallets/wallets';

export const addWallet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { walletName, mnemonic } = req.body;

    const newWallet = new WalletModel({
      walletName,
      mnemonic,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await newWallet.save();

    res.status(201).json({ message: 'Wallet added successfully', wallet: newWallet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
