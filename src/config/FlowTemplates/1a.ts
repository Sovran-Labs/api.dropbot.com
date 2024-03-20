import { v4 as uuid } from 'uuid';
import { Blockchains } from '../Blockchains';
import { InputValueTypes } from '../InputValueTypes';
import { GeneralActions } from '../GeneralActions';
import { PolygonMumbaiActions } from '../PolygonMumbaiActions';

export default function buildActionSequenceFromTemplate1() {
  const actionUuids = new Array(10).fill(1).map(() => uuid());

  const actions = [
    {
      actionUuid: actionUuids[0],
      name: GeneralActions.SYNC_BALANCES_WITH_BLOCKCHAIN,
      dependencies: {
        account: {
          type: InputValueTypes.STATE,
          key: 'global.account',
        },
        blockchains: {
          type: InputValueTypes.STATE,
          key: 'global.blockchains',
        },
      },
    },
    {
      actionUuid: actionUuids[1],
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
      },
    },
    {
      actionUuid: actionUuids[2],
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
      name: PolygonMumbaiActions.AWAIT_BLOCKS,
      dependencies: {
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
      name: PolygonMumbaiActions.POST_WRAP_NATIVE_IN_CHECK,
      dependencies: {
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
          key: 'global.account',
        },
        wrappedNativeTokenAddress: {
          type: InputValueTypes.CONFIG,
          key: 'POLYGON_MUMBAI.wrappedNativeTokenAddress',
        },
      },
    },
    {
      actionUuid: actionUuids[5],
      name: PolygonMumbaiActions.AWAIT_BLOCKS,
      dependencies: {
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
      name: PolygonMumbaiActions.AWAIT_BLOCKS,
      dependencies: {
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
      name: PolygonMumbaiActions.POST_WRAP_NATIVE_OUT_CHECK,
      dependencies: {
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
          key: 'global.account',
        },
        wrappedNativeTokenAddress: {
          type: InputValueTypes.CONFIG,
          key: 'POLYGON_MUMBAI.wrappedNativeTokenAddress',
        },
      },
    },
    {
      actionUuid: actionUuids[9],
      name: PolygonMumbaiActions.POST_SEQUENCE_CHECK,
      dependencies: {
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
          key: 'global.account',
        },
      },
    },
  ];

  return {
    actions,
    id: '1a',
    description: 'Implements a simple wrap/unwrap flow on Polygon.',
  };
}
