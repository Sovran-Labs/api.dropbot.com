import { InputValueTypes } from '@/src/config/InputValueTypes';
import { HoudiniActions } from '@/src/config/HoudiniActions';
import { HoudiniSupportedTokens } from '@/src/config/HoudiniSupportedTokens';

export interface IHoudiniGetQuote {
  actionUuid: string;
  name: HoudiniActions.HOUDINI_GET_QUOTE;
  inputs: {
    account: {
      type: InputValueTypes.STATE;
      key: string;
    };
    houdiniAmount: {
      // type: InputValueTypes.STATE;
      // key: string;
      type: InputValueTypes.HARDCODED;
      val: any;
    };
    preCheckActionUuid: {
      type: InputValueTypes.HARDCODED;
      val: string;
    };
    srcToken: {
      type: InputValueTypes.HARDCODED;
      val: HoudiniSupportedTokens;
    };
    dstToken: {
      type: InputValueTypes.HARDCODED;
      val: HoudiniSupportedTokens;
    };
  };
}
