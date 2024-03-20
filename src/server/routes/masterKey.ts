import express from 'express';
import { addMasterKey } from '../controllers/masterKey';

const router = express.Router();

router.post('/addMasterKey', addMasterKey);

export default router;
