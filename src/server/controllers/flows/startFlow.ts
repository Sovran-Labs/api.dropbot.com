import { NextFunction, Request, Response } from 'express';

import { nanoid } from 'nanoid';
import { getTemporalClient } from '@/src/server/clients/temporal_client';
import { FlowModel } from '@/src/server/models/flow/flow';
import { routeWorkFlow } from '@/src/temporal/workflows';

export const startFlow = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('calling startFlow');

    console.log('process.env.TEMPORAL_ADDRESS', process.env.TEMPORAL_ADDRESS);

    const id = req.body.flowId;
    const flow = await FlowModel.findById({ _id: id });
    // console.log('flow --->', flow);
    const temporalClient = await getTemporalClient();
    if (flow) {
      // maybe add checks for over $1,000 here?
      for (let i = 0; i < 1; i++) {
        await temporalClient.workflow.start(routeWorkFlow, {
          taskQueue: 'default',
          args: [flow?.id, flow?.template?.actions],
          workflowId: 'workflow-' + nanoid(), // in practice, use a meaningful business ID, like customerId or transactionId
        });
      }
      res.status(201).json({ message: 'Started flow successfully' });
    } else {
      throw 'flow not found';
    }
  } catch (e) {
    next(e);
  }
};
