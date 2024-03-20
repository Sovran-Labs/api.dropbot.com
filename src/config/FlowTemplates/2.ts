import { IPreCheck1Template } from '@/src/ts/interfaces/actions/actionSequenceTemplates/POLYGON_MUMBAI/preCheck1';
import { Blockchains } from '../Blockchains';
import { InputValueTypes } from '../InputValueTypes';
import { PolygonMumbaiActions } from '../PolygonMumbaiActions';

export default {
  actions: [
    {
      actionUuid: '',
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
    } as IPreCheck1Template,
    {
      name: PolygonMumbaiActions.WRAP_NATIVE_IN,
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
    {
      name: PolygonMumbaiActions.PRE_UNISWAP_V2_CHECK,
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
    {
      name: PolygonMumbaiActions.UNISWAP_V2_SWAP,
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
    {
      name: PolygonMumbaiActions.UNISWAP_V2_SWAP,
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
    {
      name: PolygonMumbaiActions.WRAP_NATIVE_OUT,
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
    // {
    //   name: PolygonMumbaiActions.PRE_BRIDGE_CHECK,
    //   dependencies: {
    //     blockchain: {
    //       type: InputValueTypes.HARDCODED,
    //       val: Blockchains.POLYGON_MUMBAI,
    //     },
    //     account: {
    //       type: InputValueTypes.STATE,
    //       key: 'global.account',
    //     },
    //     balances: {
    //       type: InputValueTypes.STATE,
    //       key: 'global.balances',
    //     },
    //   },
    // },
    // {
    //   name: GeneralActions.BRIDGE,
    //   dependencies: {
    //     fromBlockchain: {
    //       type: InputValueTypes.HARDCODED,
    //       val: Blockchains.POLYGON_MUMBAI,
    //     },
    //     toBlockchain: {
    //       type: InputValueTypes.HARDCODED,
    //       val: Blockchains.BASE,
    //     },
    //     balances: {
    //       type: InputValueTypes.STATE,
    //       key: 'global.balances',
    //     },
    //   },
    // },
  ],
  id: '2',
  description:
    'The 3rd action sequence used to test the bot. Implements a Uniswap V2 swap flow and then bridges to Base.',
};
