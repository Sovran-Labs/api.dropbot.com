import { connectDB } from '@/src/temporal/clients/db';
import { FlowModel } from '@/src/server/models/flow/flow';
import { sgMail } from '@/src/temporal/clients/sendgrid';

export async function FLOW_1_email(args: { flowId: string; actionUuid: string; actionName: string; sendTo: string }) {
  await connectDB();

  //   debugger;

  const msg = {
    to: args.sendTo, // Change to your recipient
    from: 'tad@cmdlabs.io', // Change to your verified sender
    subject: 'Your flow (1) has completed!',
    text: 'Your flow (1) has completed!',
    html: '<strong>Your flow (1) has completed!</strong>',
  };

  await sgMail.send(msg);

  const metadata = {
    sendTo: args.sendTo,
  };

  await FlowModel.updateOne(
    { _id: args.flowId },
    {
      $set: {
        [`state.actionLog.${args.actionUuid}`]: {
          name: args.actionName,
          metadata,
        },
      },
    }
  );

  return {};
}
