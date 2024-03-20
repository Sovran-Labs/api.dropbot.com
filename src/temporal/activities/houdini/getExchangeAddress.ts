import HoudiniConfig from '@/src/config/HoudiniConfig';
import { FlowModel } from '@/src/server/models/flow/flow';
import { connectDB } from '@/src/temporal/clients/db';
import { IGetExchangeAddress } from '@/src/ts/interfaces/actions/activities/houdini/getExchangeAddress/input';
import axios from 'axios';

export const HOUDINI_getExchangeAddress = async (args: IGetExchangeAddress) => {
  try {
    await connectDB();

    console.log('HoudiniConfig.HOUDINI_URL', HoudiniConfig.HOUDINI_URL);
    console.log('HoudiniConfig.HOUDINI_SWAP_AUTH_HEADER', process.env.HOUDINI_SWAP_AUTH_HEADER);

    console.log();

    console.log('args', args);

    console.log();

    const resp = await axios.request({
      method: 'POST',
      url: `${HoudiniConfig.HOUDINI_URL}/exchange`,
      headers: {
        Authorization: process.env.HOUDINI_SWAP_AUTH_HEADER,
        'Content-Type': 'application/json',
      },
      data: {
        amount: args.amount,
        from: args.from.id,
        to: args.to.id,
        receiverTag: '',
        addressTo: args.addressTo,
        anonymous: true,
        ip: '0.0.0.0',
        userAgent: '',
      },
    });

    const metadata = {
      amount: args.amount,
      from: args.from,
      to: args.to,
      receiverTag: '',
      addressTo: args.addressTo,
      anonymous: true,
      ip: '0.0.0.0',
      userAgent: '',
      exchangeAddressMetadata: resp.data,
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
  } catch (error) {
    console.log();
    console.error('HOUDINI_getExchangeAddress error', error);
    console.log();
    throw error;
  }
};
