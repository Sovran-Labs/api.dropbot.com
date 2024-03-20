import { InputValueTypes } from '@/src/config/InputValueTypes';
import { As7dActions } from '@/src/config/As7dActions';

export interface ISyncswapSwap7dTemplate {
  actionUuid: string;
  name: As7dActions;
  inputs: {
    wAccount: {
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
    tokenALowerBound: {
      type: InputValueTypes;
      key: string;
    };
    tokenAUpperBound: {
      type: InputValueTypes;
      key: string;
    };
    loopCount: {
      type: InputValueTypes;
      key: string;
    };
  };
}
