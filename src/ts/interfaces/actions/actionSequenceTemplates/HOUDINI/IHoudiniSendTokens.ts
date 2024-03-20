import { InputValueTypes } from '@/src/config/InputValueTypes';
import { HoudiniActions } from '@/src/config/HoudiniActions';

export interface IHoudiniSendTokens {
  actionUuid: string;
  name: HoudiniActions.HOUDINI_SEND_TOKENS;
  inputs: {
    senderAccount: {
      type: InputValueTypes.STATE;
      key: string;
    };
    exchangeAddress: {
      type: InputValueTypes.STATE;
      key: string;
    };
    amount: {
      type: InputValueTypes.STATE;
      key: string;
    };
    quote: {
      type: InputValueTypes.STATE;
      key: string;
    };
  };
}
