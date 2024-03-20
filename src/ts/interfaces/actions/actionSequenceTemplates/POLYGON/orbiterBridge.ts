import { Blockchains, ChainIds } from '@/src/config/Blockchains';
import { InputValueTypes } from '@/src/config/InputValueTypes';
import { GeneralActions } from '@/src/config/GeneralActions';
import { PolygonActions } from '@/src/config/PolygonActions';
import { PolygonMumbaiActions } from '@/src/config/PolygonMumbaiActions';

export interface IPolygonOrbiterBridgeTemplate {
  actionUuid: string;
  name: PolygonActions.POLYGON_ORBITER_BRIDGE;
  dependencies: {
    orbiterEnv: {
      type: InputValueTypes.HARDCODED;
      val: 'TESTNET' | 'MAINNET';
    };
    blockchain: {
      type: InputValueTypes.HARDCODED;
      val: Blockchains.POLYGON;
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
