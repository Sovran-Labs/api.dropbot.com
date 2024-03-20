import { As7aActions } from '@/src/config/As7aActions';
import { Blockchains } from '@/src/config/Blockchains';
import { InputValueTypes } from '@/src/config/InputValueTypes';

export interface IPreSequenceCheckTemplate {
  actionUuid: string;
  name: As7aActions;
  dependencies: {
    blockchain: {
      type: InputValueTypes;
      val: Blockchains;
    };
    account: {
      type: InputValueTypes;
      key: string;
    };
    balances: {
      type: InputValueTypes;
      key: string;
    };
  };
}
