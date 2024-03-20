import { v4 as uuid } from 'uuid';
import { Blockchains } from '../Blockchains';
import { InputValueTypes } from '../InputValueTypes';
import { GeneralActions } from '../GeneralActions';
import { PolygonMumbaiActions } from '../PolygonMumbaiActions';
import { Flow1Actions } from '../Flow1Actions';

export default function buildActionSequenceFromTemplate1() {
  const actionUuids = new Array(11).fill(1).map(() => uuid());

  const actions = [
    {
      actionUuid: actionUuids[0],
      name: GeneralActions.SYNC_BALANCES_WITH_BLOCKCHAIN,
      inputs: {
        account: {
          type: InputValueTypes.STATE,
          key: 'inputs.account',
        },
        blockchains: {
          type: InputValueTypes.STATE,
          key: 'inputs.blockchains',
        },
      },
    },
    {
      actionUuid: actionUuids[1],
      name: Flow1Actions.PRE_SEQUENCE_CHECK,
      inputs: {
        blockchain: {
          type: InputValueTypes.HARDCODED,
          val: Blockchains.POLYGON_MUMBAI,
        },
        account: {
          type: InputValueTypes.STATE,
          key: 'inputs.account',
        },
      },
    },
    {
      actionUuid: actionUuids[2],
      name: Flow1Actions.WRAP_NATIVE_IN,
      inputs: {
        blockchain: {
          type: InputValueTypes.HARDCODED,
          val: Blockchains.POLYGON_MUMBAI,
        },
        account: {
          type: InputValueTypes.STATE,
          key: 'inputs.account',
        },
        wrappedNativeTokenAddress: {
          type: InputValueTypes.CONFIG,
          key: 'POLYGON_MUMBAI.wrappedNativeTokenAddress',
        },
        amount: {
          type: InputValueTypes.RANGE,
          lowerBound: 100_000_000,
          upperBound: 200_000_000,
        },
      },
    },
    {
      actionUuid: actionUuids[3],
      name: Flow1Actions.AWAIT_BLOCKS,
      inputs: {
        blockchain: {
          type: InputValueTypes.HARDCODED,
          val: Blockchains.POLYGON_MUMBAI,
        },
        amountOfBlocks: {
          type: InputValueTypes.HARDCODED,
          val: 10,
        },
      },
    },
    {
      actionUuid: actionUuids[4],
      name: Flow1Actions.POST_WRAP_NATIVE_IN_CHECK,
      inputs: {
        txnHash: {
          type: InputValueTypes.STATE,
          key: `actionLog.${actionUuids[2]}.metadata.txnHash`,
        },
        preBalance: {
          type: InputValueTypes.STATE,
          key: `actionLog.${actionUuids[2]}.metadata.preBalance`,
        },
        preWMATICBalance: {
          type: InputValueTypes.STATE,
          key: `actionLog.${actionUuids[2]}.metadata.preWMATICBalance`,
        },
        amount: {
          type: InputValueTypes.STATE,
          key: `actionLog.${actionUuids[2]}.metadata.amount`,
        },
        blockchain: {
          type: InputValueTypes.HARDCODED,
          val: Blockchains.POLYGON_MUMBAI,
        },
        account: {
          type: InputValueTypes.STATE,
          key: 'inputs.account',
        },
        wrappedNativeTokenAddress: {
          type: InputValueTypes.CONFIG,
          key: 'POLYGON_MUMBAI.wrappedNativeTokenAddress',
        },
      },
    },
    {
      actionUuid: actionUuids[5],
      name: Flow1Actions.AWAIT_BLOCKS,
      inputs: {
        blockchain: {
          type: InputValueTypes.HARDCODED,
          val: Blockchains.POLYGON_MUMBAI,
        },
        amountOfBlocks: {
          type: InputValueTypes.HARDCODED,
          val: 10,
        },
      },
    },
    {
      actionUuid: actionUuids[6],
      name: Flow1Actions.WRAP_NATIVE_OUT,
      inputs: {
        blockchain: {
          type: InputValueTypes.HARDCODED,
          val: Blockchains.POLYGON_MUMBAI,
        },
        account: {
          type: InputValueTypes.STATE,
          key: 'inputs.account',
        },
        amount: {
          type: InputValueTypes.HARDCODED,
          val: 100,
        },
        wrappedNativeTokenAddress: {
          type: InputValueTypes.CONFIG,
          key: 'POLYGON_MUMBAI.wrappedNativeTokenAddress',
        },
      },
    },
    {
      actionUuid: actionUuids[7],
      name: Flow1Actions.AWAIT_BLOCKS,
      inputs: {
        blockchain: {
          type: InputValueTypes.HARDCODED,
          val: Blockchains.POLYGON_MUMBAI,
        },
        amountOfBlocks: {
          type: InputValueTypes.HARDCODED,
          val: 10,
        },
      },
    },
    {
      actionUuid: actionUuids[8],
      name: Flow1Actions.POST_WRAP_NATIVE_OUT_CHECK,
      inputs: {
        txnHash: {
          type: InputValueTypes.STATE,
          key: `actionLog.${actionUuids[6]}.metadata.txnHash`,
        },
        preBalance: {
          type: InputValueTypes.STATE,
          key: `actionLog.${actionUuids[6]}.metadata.preBalance`,
        },
        preWMATICBalance: {
          type: InputValueTypes.STATE,
          key: `actionLog.${actionUuids[6]}.metadata.preWMATICBalance`,
        },
        amount: {
          type: InputValueTypes.STATE,
          key: `actionLog.${actionUuids[6]}.metadata.amount`,
        },
        blockchain: {
          type: InputValueTypes.HARDCODED,
          val: Blockchains.POLYGON_MUMBAI,
        },
        account: {
          type: InputValueTypes.STATE,
          key: 'inputs.account',
        },
        wrappedNativeTokenAddress: {
          type: InputValueTypes.CONFIG,
          key: 'POLYGON_MUMBAI.wrappedNativeTokenAddress',
        },
      },
    },
    {
      actionUuid: actionUuids[9],
      name: Flow1Actions.POST_SEQUENCE_CHECK,
      inputs: {
        blockchain: {
          type: InputValueTypes.HARDCODED,
          val: Blockchains.POLYGON_MUMBAI,
        },
        preCheckMaticBalance: {
          type: InputValueTypes.STATE,
          key: `actionLog.${actionUuids[1]}.metadata.maticBalance`,
        },
        wrapInTxnFee: {
          type: InputValueTypes.STATE,
          key: `actionLog.${actionUuids[4]}.metadata.txnFee`,
        },
        wrapOutTxnFee: {
          type: InputValueTypes.STATE,
          key: `actionLog.${actionUuids[8]}.metadata.txnFee`,
        },
        account: {
          type: InputValueTypes.STATE,
          key: 'inputs.account',
        },
      },
    },
    // {
    //   actionUuid: actionUuids[10],
    //   name: Flow1Actions.EMAIL,
    //   inputs: {
    //     sendTo: {
    //       type: InputValueTypes.HARDCODED,
    //       val: `ceemmmdee@gmail.com`,
    //     },
    //   },
    // },
  ];

  return {
    actions,
    id: '1',
    description: 'Implements a simple wrap/unwrap flow on Polygon Mumbai.',
  };
}
