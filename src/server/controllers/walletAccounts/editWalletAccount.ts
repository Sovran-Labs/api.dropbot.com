import { Request, Response } from 'express';
import { WalletAccountModel } from '@/src/server/models/walletAccounts/walletAccounts';

export const editWalletAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { _id, accountName, account, pk, walletId, path } = req.body;

    await WalletAccountModel.findOneAndUpdate(
      { _id },
      {
        accountName,
        account,
        pk,
        walletId,
        path,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    res.status(201).json({ message: 'Wallet account edited successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
