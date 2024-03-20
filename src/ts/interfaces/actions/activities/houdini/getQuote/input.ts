import { HoudiniSupportedTokens } from '@/src/config/HoudiniSupportedTokens';

export interface IGetQuote {
  flowId: string;
  actionUuid: string;
  actionName: string;
  //
  account: string;
  houdiniAmount: {
    amount: string;
    unit: string;
    precisionMultiplier: number;
  };
  preCheckActionUuid: string;
  srcToken: HoudiniSupportedTokens;
  dstToken: HoudiniSupportedTokens;
}
