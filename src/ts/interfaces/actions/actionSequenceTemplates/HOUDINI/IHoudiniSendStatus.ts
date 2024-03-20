import { InputValueTypes } from '@/src/config/InputValueTypes';
import { HoudiniActions } from '@/src/config/HoudiniActions';

export interface IHoudiniSendStatus {
  actionUuid: string;
  name: HoudiniActions.HOUDINI_SEND_STATUS;
  inputs: {
    houdiniId: {
      type: InputValueTypes.STATE;
      key: string;
    };
    eta: {
      type: InputValueTypes.STATE;
      key: string;
    };
  };
}
