import { Blockchains } from '@/src/config/Blockchains';
import { InputValueTypes } from '@/src/config/InputValueTypes';
import { As7cActions } from '@/src/config/As7cActions';

export interface IAwaitBlocksTemplate {
  actionUuid: string;
  name: As7cActions;
  dependencies: {
    blockchain: {
      type: InputValueTypes;
      val: Blockchains;
    };
    amountOfBlocks: {
      type: InputValueTypes;
      val: number;
    };
  };
}
