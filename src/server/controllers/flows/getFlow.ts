import { NextFunction, Request, Response } from 'express';

import { FlowModel } from '@/src/server/models/flow/flow';

export const getFlow = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('calling getFlow');
    const id = req.params._id;
    const flow = await FlowModel.findById({ _id: id });
    if (flow) {
      res.status(201).json({ flow });
    } else {
      res.status(404).json({ message: 'Flow not found' });
    }
  } catch (e) {
    next(e);
  }
};
