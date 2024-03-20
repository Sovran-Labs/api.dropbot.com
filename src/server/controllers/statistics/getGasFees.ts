import { FlowModel } from '@/src/server/models/flow/flow';
import { NextFunction, Request, Response } from 'express';
import mongoose, { Document, Schema } from 'mongoose';

export const getGasFees = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('getting gas fees...');

    const result = await FlowModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.params.flowId) } },
      {
        $project: {
          actionLog: {
            $objectToArray: '$state.actionLog',
          },
        },
      },
      { $unwind: '$actionLog' },
      { $match: { 'actionLog.v.metadata.isTxnPostCheck': true } },
      {
        $group: {
          _id: null,
          totalGasFees: {
            $sum: {
              $toDouble: '$actionLog.v.metadata.txnFee',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalGasFees: 1,
        },
      },
    ])
      .then((resp) => {
        console.log('gas fee response: ', resp);
        res.status(201).json(resp);
      })
      .catch((e) => console.log('error: ', e));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
