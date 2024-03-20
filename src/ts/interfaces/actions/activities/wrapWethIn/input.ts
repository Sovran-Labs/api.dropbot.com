import { Blockchains } from '@/src/config/Blockchains';

export interface IWrapWethInInput {
  flowId: string;
  actionUuid: string;
  actionName: string;
  blockchain: Blockchains;
  account: string;
  wethAddress: string;
  percentOfBalance: number;
}
