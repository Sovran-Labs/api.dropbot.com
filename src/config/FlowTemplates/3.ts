import { v4 as uuid } from 'uuid';
import { Blockchains } from '../Blockchains';
import { InputValueTypes } from '../InputValueTypes';
import { GeneralActions } from '../GeneralActions';
import { SepoliaActions } from '../SepoliaActions';

export default function buildActionSequenceFromTemplate3() {
  const actionUuids = new Array(2).fill(1).map(() => uuid());

  const actions = [
    {
      actionUuid: actionUuids[0],
      name: SepoliaActions.PRE_SEQUENCE_CHECK,
      dependencies: {
        blockchain: {
          type: InputValueTypes.HARDCODED,
          val: Blockchains.SEPOLIA,
        },
        account: {
          type: InputValueTypes.STATE,
          key: 'global.account',
        },
      },
    },
    {
      actionUuid: actionUuids[1],
      name: GeneralActions.ORBITER_BRIDGE,
      dependencies: {
        account: {
          type: InputValueTypes.STATE,
          key: 'global.account',
        },
        orbiterEnv: {
          type: InputValueTypes.HARDCODED,
          val: 'TESTNET',
        },
        sourceChain: {
          type: InputValueTypes.HARDCODED,
          val: {
            id: '11155111',
            name: Blockchains.SEPOLIA,
            // id: '137',
            // name: Blockchains.POLYGON,
          },
        },
        sourceTokenAddress: {
          type: InputValueTypes.HARDCODED,
          val: '0x0000000000000000000000000000000000000000', // ie: Sepolia ETH
          // val: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', // ie: WETH on Polygon
        },
        targetChain: {
          type: InputValueTypes.HARDCODED,
          val: {
            id: '300',
            name: Blockchains.ZKSYNC_SEPOLIA_TESTNET,
            // id: '324',
            // name: Blockchains.ZKSYNC,
          },
        },
        targetTokenAddress: {
          type: InputValueTypes.HARDCODED,
          val: '0x0000000000000000000000000000000000000000', // ie: zkSync Sepolia Testnet ETH
        },
        percentageToBridge: {
          type: InputValueTypes.RANGE,
          lowerBound: 1,
          upperBound: 1,
        },
      },
    },
  ];

  return {
    actions,
    id: '3',
    description: 'An action sequence for testing bridging L1 tokens from Sepolia to zkSync Sepolia Testnet.',
  };
}
