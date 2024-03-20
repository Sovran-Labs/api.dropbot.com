import { Blockchains } from '@/src/config/Blockchains';
import { InputValueTypes } from '@/src/config/InputValueTypes';
import { PolygonMumbaiActions } from '@/src/config/PolygonMumbaiActions';

export interface IWrapWethInTemplate {
  actionUuid: string;
  name: PolygonMumbaiActions;
  dependencies: {
    account: {
      type: InputValueTypes;
      key: string;
    };
    blockchain: {
      type: InputValueTypes;
      val: Blockchains;
    };
    wethAddress: {
      type: InputValueTypes;
      key: string;
    };
    percentOfBalance: {
      type: InputValueTypes;
      lowerBound: number;
      upperBound: number;
    };
  };
}
