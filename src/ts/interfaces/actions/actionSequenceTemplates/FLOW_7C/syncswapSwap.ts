import { Blockchains, ChainIds } from '@/src/config/Blockchains';
import { InputValueTypes } from '@/src/config/InputValueTypes';
import { As7cActions } from '@/src/config/As7cActions';

export interface ISyncswapSwap7cTemplate {
  actionUuid: string;
  name: As7cActions;
  inputs: {
    wAccount: {
      type: InputValueTypes;
      key: string;
    };
    tokenAAmount: {
      type: InputValueTypes;
      key: string;
    };
    tokenA: {
      type: InputValueTypes;
      key: string;
    };
    tokenB: {
      type: InputValueTypes;
      key: string;
    };
  };
}
