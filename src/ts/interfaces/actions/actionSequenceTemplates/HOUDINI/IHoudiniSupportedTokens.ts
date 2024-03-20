import { Blockchains, ChainIds } from '@/src/config/Blockchains';
import { InputValueTypes } from '@/src/config/InputValueTypes';
import { GeneralActions } from '@/src/config/GeneralActions';
import { HoudiniActions } from '@/src/config/HoudiniActions';
import { HoudiniSupportedTokens } from '@/src/config/HoudiniSupportedTokens';
import { PolygonActions } from '@/src/config/PolygonActions';
import { PolygonMumbaiActions } from '@/src/config/PolygonMumbaiActions';

export interface IHoudiniSupportedTokens {
  actionUuid: string;
  name: HoudiniActions.HOUDINI_GET_SUPPORTED_TOKENS;
  inputs: {
    account: {
      type: InputValueTypes.STATE;
      key: string;
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
