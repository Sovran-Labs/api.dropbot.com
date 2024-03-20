import { Blockchains, ChainIds } from '@/src/config/Blockchains';

export interface IOrbiterBridgeInput {
  flowId: string;
  actionUuid: string;
  actionName: string;
  account: string;
  orbiterEnv: 'TESTNET' | 'MAINNET';
  sourceChain: {
    id: ChainIds;
    name: Blockchains;
  };
  sourceTokenAddress: string;
  targetChain: {
    id: ChainIds;
    name: string;
  };
  targetTokenAddress: string;
  percentageToBridge: number;
}
