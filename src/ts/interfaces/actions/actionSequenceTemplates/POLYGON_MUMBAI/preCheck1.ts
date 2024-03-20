import { Blockchains } from '@/src/config/Blockchains';
import { InputValueTypes } from '@/src/config/InputValueTypes';
import { PolygonMumbaiActions } from '@/src/config/PolygonMumbaiActions';

export interface IPreCheck1Template {
  actionUuid: string;
  name: PolygonMumbaiActions;
  dependencies: {
    account: {
      type: InputValueTypes.STATE;
      key: string;
    };
    blockchain: {
      type: InputValueTypes.HARDCODED;
      val: Blockchains;
    };
    balances: {
      type: InputValueTypes.STATE;
      key: string;
    };
  };
}
