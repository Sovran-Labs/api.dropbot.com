import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { CycleModel } from '../../ts/interfaces/cycle';

export const updateUsdTxnVolume = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('getting usd txn volume...');
    console.log('req.body.usdTxnAmount: ', req.body.usdTxnAmount);

    const flowId = req.params.flowId;
    const usdTxnAmount = req.body.usdTxnAmount;
    const result = await CycleModel.updateOne(
      { originalFlowId: new mongoose.Types.ObjectId(flowId) },
      // { $set: { usdCurrentAmount: usdTxnAmount } }
      { $inc: { usdCurrentAmount: usdTxnAmount / 1000000 } }
    )
      .then((resp) => {
        console.log('usd txn volume response: ', resp);
        // const txnLogCount = resp[0].txnLogCount;
        res.status(201).json(resp);
      })
      .catch((e) => console.log('error: ', e));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
