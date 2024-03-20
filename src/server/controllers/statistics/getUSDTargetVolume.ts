import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { CycleModel } from '../../ts/interfaces/cycle';

export const getUSDTargetVolume = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('getting USD target volume...');

    const result = await CycleModel.aggregate([
      { $match: { originalFlowId: new mongoose.Types.ObjectId(req.params.flowId) } },
    ])
      .then((resp) => {
        console.log('USD target volume response: ', resp[0].state.inputs.usdTxnTargetValue);
        const data = resp[0].state.inputs.usdTxnTargetValue;
        res.status(201).json(data);
      })
      .catch((e) => console.log('error: ', e));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
