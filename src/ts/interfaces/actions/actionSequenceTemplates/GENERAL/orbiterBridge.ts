import { Blockchains, ChainIds } from '@/src/config/Blockchains';
import { InputValueTypes } from '@/src/config/InputValueTypes';
import { GeneralActions } from '@/src/config/GeneralActions';
import { PolygonMumbaiActions } from '@/src/config/PolygonMumbaiActions';

export interface IOrbiterBridgeTemplate {
  actionUuid: string;
  name: GeneralActions.ORBITER_BRIDGE;
  dependencies: {
    orbiterEnv: {
      type: InputValueTypes.HARDCODED;
      val: 'TESTNET' | 'MAINNET';
    };
    account: {
      type: InputValueTypes.STATE;
      key: string;
    };
    sourceChain: {
      type: InputValueTypes.HARDCODED;
      val: {
        id: ChainIds;
        name: Blockchains;
      };
    };
    sourceTokenAddress: {
      type: InputValueTypes.HARDCODED;
      val: string;
    };
    targetChain: {
      type: InputValueTypes.HARDCODED;
      val: {
        id: ChainIds;
        name: Blockchains;
      };
    };
    targetTokenAddress: {
      type: InputValueTypes.HARDCODED;
      val: string;
    };
    percentageToBridge: {
      type: InputValueTypes.RANGE;
      lowerBound: number;
      upperBound: number;
    };
  };
}
