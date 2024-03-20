import { Blockchains } from '@/src/config/Blockchains';
import { InputValueTypes } from '@/src/config/InputValueTypes';
import { PolygonMumbaiActions } from '@/src/config/PolygonMumbaiActions';

export interface IPostWrapWethInTemplate {
  actionUuid: string;
  name: PolygonMumbaiActions;
  dependencies: {
    account: {
      type: InputValueTypes.STATE;
      key: string;
    };
    blockchain: {
      type: InputValueTypes.HARDCODED;
      val: Blockchains.POLYGON_MUMBAI;
    };
    txnHash: {
      type: InputValueTypes.STATE;
      key: string;
    };
    preBalance: {
      type: InputValueTypes.STATE;
      key: string;
    };
    preWETHBalance: {
      type: InputValueTypes.STATE;
      key: string;
    };
    amountWrapped: {
      type: InputValueTypes.STATE;
      key: string;
    };
  };
}
