import { v4 as uuid } from 'uuid';
import { InputValueTypes } from '../InputValueTypes';
import { OrbiterActions } from '../OrbiterActions';

export default function buildActionsFromTemplateGeneralizedHoudini() {
  const actionUuids = new Array(3).fill(1).map(() => uuid());

  const actions = [
    {
      actionUuid: actionUuids[0],
      name: OrbiterActions.BRIDGE_TOKENS,
      inputs: {
        router: {
          type: InputValueTypes.STATE,
          key: `inputs.router`,
        },
        amount: {
          type: InputValueTypes.STATE,
          key: `inputs.amount`,
        },
        address: {
          type: InputValueTypes.STATE,
          key: `inputs.address`,
        },
      },
    },
  ];

  return {
    actions,
    id: 'orbiter',
    description: 'The first generalized action sequence for performing Orbiter bridges.',
  };
}
