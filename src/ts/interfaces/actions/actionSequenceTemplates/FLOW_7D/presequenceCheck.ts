import { As7dActions } from '@/src/config/As7dActions';
import { Blockchains } from '@/src/config/Blockchains';
import { InputValueTypes } from '@/src/config/InputValueTypes';

export interface IPreSequenceCheckTemplate {
  actionUuid: string;
  name: As7dActions;
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
