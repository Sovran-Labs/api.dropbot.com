import { HoudiniSupportedTokens } from '@/src/config/HoudiniSupportedTokens';

export interface ISendStatus {
  flowId: string;
  actionUuid: string;
  actionName: string;
  houdiniId: string;
  eta: number;
}
