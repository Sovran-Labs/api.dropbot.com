import { ISendStatus } from '@/src/ts/interfaces/actions/activities/houdini/sendStatus/input';
import { FlowModel } from '@/src/server/models/flow/flow';
import { connectDB } from '@/src/temporal/clients/db';
import { sleep } from '@/src/scripts/utils/sleep';
import axios from 'axios';
import HoudiniConfig from '@/src/config/HoudiniConfig';

export const HOUDINI_sendStatus = async (args: ISendStatus) => {
  await connectDB();
  await sleep(10000);

  let accumTime = 0;
  let _422_error_count = 0;
  let resp;
  while (accumTime < args.eta * 60 * 2) {
    await sleep(10000);

    try {
      resp = await axios.request({
        method: 'GET',
        url: `${HoudiniConfig.HOUDINI_URL}/status`,
        headers: {
          Authorization: process.env.HOUDINI_SWAP_AUTH_HEADER,
          'Content-Type': 'application/json',
        },
        data: {
          id: args.houdiniId,
          // id: ``, // hardcoding houdiniId can be useful for testing
        },
      });
    } catch (e) {
      _422_error_count += 1;
      console.log('_422_error_count!', _422_error_count);
      if (_422_error_count > 10) {
        throw e;
      }
    }

    console.log('--- --- ---');
    console.log('houdiniId', args.houdiniId);
    console.log('status...', resp?.data?.status);
    console.log('eta...', args.eta);
    console.log('accumTime...', accumTime);

    if (resp?.data?.status === 4) break;
    accumTime += 10;
  }

  const metadata = {
    houdiniId: args.houdiniId,
    accumTime,
    houdiniIdStatus: resp?.data?.status,
    _422_error_count,
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
