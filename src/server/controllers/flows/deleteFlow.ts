import { Request, Response } from 'express';
import { FlowModel } from '@/src/server/models/flow/flow';

export const deleteFlow = async (req: Request, res: Response): Promise<void> => {
  try {
    const { _id } = req.body;

    await FlowModel.deleteOne({
      _id,
    });

    res.status(201).json({ message: 'Flow deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
