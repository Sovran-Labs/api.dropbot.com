import express from 'express';
import { addWalletAccount } from '../controllers/walletAccount';

const router = express.Router();

router.post('/addWalletAccount', addWalletAccount);

export default router;
