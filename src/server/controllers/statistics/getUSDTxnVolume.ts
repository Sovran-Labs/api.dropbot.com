import { FlowModel } from '@/src/server/models/flow/flow';
import { NextFunction, Request, Response } from 'express';
import mongoose, { Document, Schema } from 'mongoose';
import { CycleModel } from '../../ts/interfaces/cycle';

export const getUSDTransactionVolume = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('getting USD transaction volume...');

    const result = await CycleModel.aggregate([
      { $match: { originalFlowId: new mongoose.Types.ObjectId(req.params.flowId) } },
    ])
      .then((resp) => {
        console.log('USD transaction volume response: ', resp);
        res.status(201).json(resp[0].usdCurrentAmount);
      })
      .catch((e) => console.log('error: ', e));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
