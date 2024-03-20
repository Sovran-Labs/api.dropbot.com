import { FlowModel } from '@/src/server/models/flow/flow';
import { NextFunction, Request, Response } from 'express';
import mongoose, { Document, Schema } from 'mongoose';
import { CycleModel } from '../../ts/interfaces/cycle';

export const getTxnCount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('getting txn count...');

    const result = await CycleModel.aggregate([
      { $match: { originalFlowId: new mongoose.Types.ObjectId(req.params.flowId) } },
      {
        $project: {
          txnLogCount: { $size: '$txnLog' },
        },
      },
    ])
      .then((resp) => {
        // console.log('txn count response: ', resp[0].txnLogCount);
        const txnLogCount = resp[0].txnLogCount;
        res.status(201).json(resp);
      })
      .catch((e) => console.log('error: ', e));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
