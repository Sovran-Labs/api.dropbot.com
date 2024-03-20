import { HoudiniSupportedTokens } from '@/src/config/HoudiniSupportedTokens';

export interface IGetSupportedTokens {
  flowId: string;
  actionUuid: string;
  actionName: string;
  account: string;
  srcToken: HoudiniSupportedTokens;
  dstToken: HoudiniSupportedTokens;
}
