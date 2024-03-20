import { HoudiniSupportedToken } from '@/src/ts/interfaces/HoudiniSupportedToken';

export interface IBridgeTokens {
  flowId: string;
  actionUuid: string;
  actionName: string;
  address: string;
  router: CrossChainRouterType;
  amount: string;
}

export type CrossChainRouterType = {
  line: string;
  endpoint: string;
  endpointContract: any;
  srcChain: string;
  tgtChain: string;
  srcToken: string;
  tgtToken: string;
  maxAmt: string;
  minAmt: string;
  tradeFee: string;
  withholdingFee: string;
  vc: string;
  state: string;
  compRatio: number;
  spentTime: number;
};
