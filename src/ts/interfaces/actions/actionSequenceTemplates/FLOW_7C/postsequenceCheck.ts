import { Blockchains } from '@/src/config/Blockchains';
import { InputValueTypes } from '@/src/config/InputValueTypes';
import { As7cActions } from '@/src/config/As7cActions';

export interface IPostSequenceCheckTemplate {
  actionUuid: string;
  name: As7cActions;
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
