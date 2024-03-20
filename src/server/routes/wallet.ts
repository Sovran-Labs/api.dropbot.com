// src/routes/userRoutes.ts

import express from 'express';
import { addWallet } from '../controllers/wallet';

const router = express.Router();

router.post('/addWallet', addWallet);

export default router;
