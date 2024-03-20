import { HoudiniSupportedToken } from '@/src/ts/interfaces/HoudiniSupportedToken';

export interface IGetExchangeAddress {
  flowId: string;
  actionUuid: string;
  actionName: string;
  amount: string;
  from: HoudiniSupportedToken;
  to: HoudiniSupportedToken;
  addressTo: string;
}
