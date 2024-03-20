import { FlowModel } from '@/src/server/models/flow/flow';
import { NextFunction, Request, Response } from 'express';
import mongoose, { Document, Schema } from 'mongoose';

export const getTxns = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('getting txns...');

    const txns: any[] = [];

    // Change this to count the items in the array of the cycle collection's txnLogs of the flow with matching flowId.
    const result = await FlowModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.params.flowId) } },
      { $unwind: '$actionSequence.actions' },
      {
        $project: {
          actionDetails: {
            $filter: {
              input: { $objectToArray: '$state.actionLog' },
              as: 'log',
              cond: { $eq: ['$$log.k', '$actionSequence.actions.actionUuid'] },
            },
          },
          dependencies: '$actionSequence.actions.dependencies',
        },
      },
      { $unwind: '$actionDetails' },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ['$$ROOT.actionDetails.v', { _id: '$$ROOT.actionDetails.k', dependencies: '$dependencies' }],
          },
        },
      },
      { $match: { _id: { $exists: true } } }, // Ensure that documents with no actionLog are filtered out
    ])
      .then((resp) => {
        console.log('response: ', resp);
        res.status(201).json(resp);
      })
      .catch((e) => console.log('error: ', e));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
