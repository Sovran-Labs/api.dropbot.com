import { FlowModel } from '@/src/server/models/flow/flow';
import { IGetSupportedTokens } from '@/src/ts/interfaces/actions/activities/houdini/getSupportedTokens/input';
import assert from 'assert';
import axios from 'axios';
import { connectDB } from '@/src/temporal/clients/db';
import HoudiniConfig from '@/src/config/HoudiniConfig';

export const HOUDINI_getSupportedTokens = async (args: IGetSupportedTokens) => {
  await connectDB();

  const resp = await axios.request({
    url: `${HoudiniConfig.HOUDINI_URL}/tokens`,
    headers: {
      Authorization: process.env.HOUDINI_SWAP_AUTH_HEADER,
    },
  });

  const srcToken = resp.data.find((i: any) => i.id === args.srcToken);
  const destToken = resp.data.find((i: any) => i.id === args.dstToken);

  assert(srcToken, 'Houdini does not support src token');
  assert(destToken, 'Houdini does not support dest token');

  const metadata = {
    srcToken,
    destToken,
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
