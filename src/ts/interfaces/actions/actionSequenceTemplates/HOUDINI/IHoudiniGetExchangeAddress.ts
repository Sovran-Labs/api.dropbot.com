import { InputValueTypes } from '@/src/config/InputValueTypes';
import { HoudiniActions } from '@/src/config/HoudiniActions';

export interface IHoudiniGetExchangeAddress {
  actionUuid: string;
  name: HoudiniActions.HOUDINI_GET_EXCHANGE_ADDRESS;
  inputs: {
    account: {
      type: InputValueTypes.STATE;
      key: string;
    };
    amount: {
      type: InputValueTypes.STATE;
      key: string;
    };
    from: {
      type: InputValueTypes.STATE;
      key: string;
    };
    to: {
      type: InputValueTypes.STATE;
      key: string;
    };
    addressTo: {
      type: InputValueTypes.STATE;
      key: string;
    };
  };
}
