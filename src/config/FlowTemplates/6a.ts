import { v4 as uuid } from 'uuid';
import { InputValueTypes } from '../InputValueTypes';
import { GeneralActions } from '../GeneralActions';
import { HoudiniActions } from '../HoudiniActions';

import { IHoudiniSupportedTokens } from '@/src/ts/interfaces/actions/actionSequenceTemplates/HOUDINI/IHoudiniSupportedTokens';
import { IHoudiniGetQuote } from '@/src/ts/interfaces/actions/actionSequenceTemplates/HOUDINI/IHoudiniGetQuote';
import { As6Actions } from '../As6Actions';
import { IHoudiniGetExchangeAddress } from '@/src/ts/interfaces/actions/actionSequenceTemplates/HOUDINI/IHoudiniGetExchangeAddress';
import { IHoudiniSendTokens } from '@/src/ts/interfaces/actions/actionSequenceTemplates/HOUDINI/IHoudiniSendTokens';
import { ChainIds } from '../Blockchains';
import SupportedTokens from '../SupportedTokens';

export default function buildActionSequenceFromTemplate6() {
  const actionUuids = new Array(10).fill(1).map(() => uuid());

  const actions = [
    {
      actionUuid: actionUuids[0],
      name: GeneralActions.SYNC_BALANCES_WITH_BLOCKCHAIN,
      inputs: {
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
      name: As6Actions.PRE_SEQUENCE_CHECK,
      inputs: {
        account: {
          type: InputValueTypes.STATE,
          key: 'global.account',
        },
        houdini1SrcToken: {
          type: InputValueTypes.HARDCODED,
          val: 'ETHARB',
        },
        houdini1DstToken: {
          type: InputValueTypes.HARDCODED,
          val: 'MATIC',
        },
      },
    },
    {
      actionUuid: actionUuids[2],
      name: HoudiniActions.HOUDINI_GET_SUPPORTED_TOKENS,
      inputs: {
        account: {
          type: InputValueTypes.STATE,
          key: 'global.account',
        },
        srcToken: {
          type: InputValueTypes.HARDCODED,
          val: 'ETHARB',
        },
        dstToken: {
          type: InputValueTypes.HARDCODED,
          val: 'MATIC',
        },
      },
    } as IHoudiniSupportedTokens,
    {
      actionUuid: actionUuids[3],
      name: HoudiniActions.HOUDINI_GET_QUOTE,
      inputs: {
        account: {
          type: InputValueTypes.STATE,
          key: 'global.account',
        },
        houdiniAmount: {
          type: InputValueTypes.HARDCODED,
          val: {
            amount: '0.01',
            symbol: 'ETH',
            precisionMultiplier: 18,
          },
        },
        srcToken: {
          type: InputValueTypes.HARDCODED,
          val: 'ETHARB',
        },
        preCheckActionUuid: {
          type: InputValueTypes.HARDCODED,
          val: actionUuids[1],
        },
        dstToken: {
          type: InputValueTypes.HARDCODED,
          val: 'MATIC',
        },
      },
    } as IHoudiniGetQuote,
    {
      actionUuid: actionUuids[4],
      name: HoudiniActions.HOUDINI_GET_EXCHANGE_ADDRESS,
      inputs: {
        amount: {
          type: InputValueTypes.STATE,
          key: `actionLog.${actionUuids[3]}.metadata.amount`, // get it from the quote
        },
        from: {
          type: InputValueTypes.STATE,
          key: `actionLog.${actionUuids[3]}.metadata.from`, // get it from the quote
        },
        to: {
          type: InputValueTypes.STATE,
          key: `actionLog.${actionUuids[3]}.metadata.to`, // get it from the quote
        },
        addressTo: {
          type: InputValueTypes.STATE,
          key: 'global.account',
        },
      },
    } as IHoudiniGetExchangeAddress,
    // {
    //   actionUuid: actionUuids[5],
    //   name: HoudiniActions.HOUDINI_SEND_TOKENS,
    //   dependencies: {
    //     senderAccount: {
    //       type: InputValueTypes.STATE,
    //       key: 'global.obfuscatedAccount',
    //     },
    //     exchangeAddress: {
    //       type: InputValueTypes.STATE,
    //       key: `actionLog.${actionUuids[4]}.metadata.exchangeAddressMetadata.senderAddress`,
    //     },
    //     amount: {
    //       type: InputValueTypes.HARDCODED,
    //       val: {
    //         amount: '0.01',
    //         symbol: 'ETH',
    //         precisionMultiplier: 18,
    //       },
    //     },
    //     srcChain: {
    //       type: InputValueTypes.HARDCODED,
    //       val: ChainIds.ARBITRUM_ONE,
    //     },
    //     srcToken: {
    //       type: InputValueTypes.HARDCODED,
    //       val: SupportedTokens['ARBITRUM_ONE']['ETH'],
    //     },
    //   },
    // } as IHoudiniSendTokens,
    {
      actionUuid: actionUuids[6],
      name: HoudiniActions.HOUDINI_SEND_STATUS,
      inputs: {
        houdiniId: {
          type: InputValueTypes.STATE,
          key: `actionLog.${actionUuids[4]}.metadata.exchangeAddressMetadata.houdiniId`,
        },
        eta: {
          type: InputValueTypes.STATE,
          key: `actionLog.${actionUuids[4]}.metadata.exchangeAddressMetadata.eta`,
        },
      },
    },
  ];

  return {
    actions,
    id: '6a',
    description: 'The 2nd action sequence for testing obfuscation with HoudiniSwap on mainnet from ETHARB to MATIC.',
  };
}
