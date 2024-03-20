import { As7cActions } from '@/src/config/As7cActions';
import { Blockchains } from '@/src/config/Blockchains';
import { InputValueTypes } from '@/src/config/InputValueTypes';

export interface IPreSequenceCheckTemplate {
  actionUuid: string;
  name: As7cActions;
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
