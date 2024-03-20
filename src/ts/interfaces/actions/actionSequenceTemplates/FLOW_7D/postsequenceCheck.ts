import { Blockchains } from '@/src/config/Blockchains';
import { InputValueTypes } from '@/src/config/InputValueTypes';
import { As7dActions } from '@/src/config/As7dActions';

export interface IPostSequenceCheckTemplate {
  actionUuid: string;
  name: As7dActions;
  dependencies: {
    blockchain: {
      type: InputValueTypes;
      val: Blockchains;
    };
    preCheckMaticBalance: {
      type: InputValueTypes;
      key: string;
    };
    wrapInTxnFee: {
      type: InputValueTypes;
      key: string;
    };
    wrapOutTxnFee: {
      type: InputValueTypes;
      key: string;
    };
    account: {
      type: InputValueTypes;
      key: string;
    };
  };
}
