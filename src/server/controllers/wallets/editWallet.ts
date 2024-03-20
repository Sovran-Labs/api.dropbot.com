import { Request, Response } from 'express';
import { WalletModel } from '@/src/server/models/wallets/wallets';

export const editWallet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { _id, mnemonic, walletName } = req.body;

    await WalletModel.findOneAndUpdate(
      { _id },
      {
        mnemonic,
        walletName,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    res.status(201).json({ message: 'Wallet edited successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
