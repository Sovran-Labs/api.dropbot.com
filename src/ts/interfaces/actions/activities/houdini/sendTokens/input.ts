import { ChainIds } from '@/src/config/Blockchains';
import { HoudiniSupportedToken } from '@/src/ts/interfaces/HoudiniSupportedToken';

export interface ISendTokens {
  flowId: string;
  actionUuid: string;
  actionName: string;
  senderAccount: string;
  amount: {
    amount: string;
    symbol: string;
    precision: number;
  };
  exchangeAddress: string;
  from: HoudiniSupportedToken;
  to: HoudiniSupportedToken;
  addressTo: string;
  quote: string;
}
