import { Blockchains } from '@/src/config/Blockchains';
import { InputValueTypes } from '@/src/config/InputValueTypes';
import { As7dActions } from '@/src/config/As7dActions';

export interface IAwaitBlocksTemplate {
  actionUuid: string;
  name: As7dActions;
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
