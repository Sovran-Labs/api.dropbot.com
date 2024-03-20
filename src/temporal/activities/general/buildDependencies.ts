import get from 'lodash.get';

import { InputValueTypes } from '../../../config/InputValueTypes';

import FlowConfig from '../../../config/FlowConfig';

import { connectDB, disconnectDB } from '../../clients/db';
import { FlowModel } from '@/src/server/models/flow/flow';

export async function GENERAL_buildDependencies(
  flowId: string,
  actionUuid: string,
  actionName: string,
  inputsSpec: any
): Promise<any> {
  const inputs: any = {
    // Always include the flowId, actionUuid, and actionName : )
    flowId,
    actionUuid,
    actionName,
  };

  console.log('inputsSpec', inputsSpec);

  const dependencyKeys = inputsSpec ? Object.keys(inputsSpec) : [];
  for (const dk of dependencyKeys) {
    if (inputsSpec[dk].type === InputValueTypes.CONFIG) {
      inputs[dk] = get(FlowConfig, inputsSpec[dk].key);
    } else if (inputsSpec[dk].type === InputValueTypes.HARDCODED) {
      inputs[dk] = inputsSpec[dk].val;
    } else if (inputsSpec[dk].type === InputValueTypes.RANGE) {
      const value =
        Math.floor(Math.random() * (inputsSpec[dk].upperBound - inputsSpec[dk].lowerBound + 1)) +
        inputsSpec[dk].lowerBound;
      inputs[dk] = value;
    } else if (inputsSpec[dk].type === InputValueTypes.STATE) {
      await connectDB();
      const doc = await FlowModel.findOne({
        _id: flowId,
      });

      inputs[dk] = get(doc?.state, inputsSpec[dk].key);

      await disconnectDB();
    } else {
      throw 'UNSUPPORTED_DEPENDENCY_TYPE';
    }
  }

  return inputs;
}
