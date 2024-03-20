import { FlowModel } from '@/src/server/models/flow/flow';
import { NextFunction, Request, Response } from 'express';
import mongoose, { Document, Schema } from 'mongoose';

export const clearFlowLogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('clearing flow logs...');

    const flowId = req.body.flowId;

    const result = await FlowModel.updateMany(
      { _id: new mongoose.Types.ObjectId(flowId) },
      { $unset: { 'state.actionLog': '' } }
    )
      .then((resp: any) => {
        console.log('response: ', resp);
        res.status(201).json(resp);
      })
      .catch((e) => console.log('error: ', e));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
