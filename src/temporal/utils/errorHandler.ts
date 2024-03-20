import { ApplicationFailure } from '@temporalio/workflow';

export function errorHandler(e: any) {
  console.error('WORKFLOW ERROR HANDLER');
  console.error(e);

  if (e instanceof Error) {
    throw new ApplicationFailure(e.toString());
  } else {
    throw new ApplicationFailure('Workflow error', null, null, [e]);
  }
}
