import { FlowModel } from '@/src/server/models/flow/flow';
import { connectDB } from '@/src/temporal/clients/db';
import HoudiniConfig from '@/src/config/HoudiniConfig';
import axios from 'axios';
import { IGetQuote } from '@/src/ts/interfaces/actions/activities/houdini/getQuote/input';

export const HOUDINI_getQuote = async (args: IGetQuote) => {
  await connectDB();

  const resp = await axios.request({
    method: 'GET',
    url: `${HoudiniConfig.HOUDINI_URL}/quote`,
    headers: {
      Authorization: process.env.HOUDINI_SWAP_AUTH_HEADER,
      'Content-Type': 'application/json',
    },
    data: {
      amount: args.houdiniAmount.amount,
      from: args.srcToken,
      to: args.dstToken,
      anonymous: true,
    },
  });

  const metadata = {
    amount: args.houdiniAmount.amount,
    from: args.srcToken,
    to: args.dstToken,
    anonymous: true,
    quote: resp.data,
    preCheckActionUuid: args.preCheckActionUuid,
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

  return metadata;
};
