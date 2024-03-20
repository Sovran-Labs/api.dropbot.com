import { Request, Response } from 'express';
import { FlowModel } from '@/src/server/models/flow/flow';

export const getFlows = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('calling getFlows...');

    const flows = await FlowModel?.find().sort({ createdAt: -1 });

    res.status(201).json({ flows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
