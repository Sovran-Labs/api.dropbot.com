import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { CycleModel } from '../../ts/interfaces/cycle';

export const updateUsdGasVolume = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('getting usd gas volume...');
    console.log('req.body.usdGasAmount: ', req.body.usdGasAmount);

    const flowId = req.params.flowId;
    const usdGasAmount = req.body.usdCurrentGasSpent;
    const result = await CycleModel.updateOne(
      { originalFlowId: new mongoose.Types.ObjectId(flowId) },
      { $inc: { usdCurrentGasSpent: (usdGasAmount / 1000000000) * 3200 } }
    )
      .then((resp) => {
        console.log('usd gas volume response: ', resp);
        // const txnLogCount = resp[0].txnLogCount;
        res.status(201).json(resp);
      })
      .catch((e) => console.log('error: ', e));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
