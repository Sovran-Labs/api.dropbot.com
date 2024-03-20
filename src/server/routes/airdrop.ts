import express from 'express';
import { addAirdrop } from '../controllers/airdrop';

const router = express.Router();

router.post('/addAirdrop', addAirdrop);

export default router;
