import { Blockchains } from '../Blockchains';
import { InputValueTypes } from '../InputValueTypes';
import { GeneralActions } from '../GeneralActions';
import { PolygonMumbaiActions } from '../PolygonMumbaiActions';

export default {
  actions: [
    {
      name: PolygonMumbaiActions.PRE_SEQUENCE_CHECK,
      dependencies: {
        blockchain: {
          type: InputValueTypes.HARDCODED,
          val: Blockchains.POLYGON_MUMBAI,
        },
        account: {
          type: InputValueTypes.STATE,
          key: 'global.account',
        },
        balances: {
          type: InputValueTypes.STATE,
          key: 'global.balances',
        },
      },
    },
  ],
  id: '0',
  description: 'An action sequence for testing one or two actions at a time.',
};
