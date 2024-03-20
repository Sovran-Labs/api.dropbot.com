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
import { IHoudiniSendStatus } from '@/src/ts/interfaces/actions/actionSequenceTemplates/HOUDINI/IHoudiniSendStatus';

export default function buildActionsFromTemplateGeneralizedHoudini() {
  const actionUuids = new Array(3).fill(1).map(() => uuid());

  const actions = [
    {
      actionUuid: actionUuids[0],
      name: HoudiniActions.HOUDINI_GET_EXCHANGE_ADDRESS,
      inputs: {
        amount: {
          type: InputValueTypes.STATE,
          key: `inputs.tokenAAmount`, // get it from the quote
        },
        from: {
          type: InputValueTypes.STATE,
          key: `inputs.tokenA`,
        },
        to: {
          type: InputValueTypes.STATE,
          key: `inputs.tokenB`,
        },
        addressTo: {
          type: InputValueTypes.STATE,
          key: `inputs.receiverAddress`,
        },
      },
    } as IHoudiniGetExchangeAddress,
    {
      actionUuid: actionUuids[1],
      name: HoudiniActions.HOUDINI_SEND_TOKENS,
      inputs: {
        from: {
          type: InputValueTypes.STATE,
          key: `inputs.tokenA`,
        },
        to: {
          type: InputValueTypes.STATE,
          key: `inputs.tokenB`,
        },
        senderAccount: {
          type: InputValueTypes.STATE,
          key: 'inputs.obfuscatedAddress',
        },
        exchangeAddress: {
          type: InputValueTypes.STATE,
          key: `actionLog.${actionUuids[0]}.metadata.exchangeAddressMetadata.senderAddress`,
        },
        addressTo: {
          type: InputValueTypes.STATE,
          key: `inputs.receiverAddress`,
        },
        amount: {
          type: InputValueTypes.STATE,
          key: `inputs.tokenAAmount`,
        },
        quote: {
          type: InputValueTypes.STATE,
          key: `inputs.tokenBAmount`,
        },
      },
    } as IHoudiniSendTokens,
    {
      actionUuid: actionUuids[2],
      name: HoudiniActions.HOUDINI_SEND_STATUS,
      inputs: {
        houdiniId: {
          type: InputValueTypes.STATE,
          key: `actionLog.${actionUuids[0]}.metadata.exchangeAddressMetadata.houdiniId`,
        },
        eta: {
          type: InputValueTypes.STATE,
          key: `actionLog.${actionUuids[0]}.metadata.exchangeAddressMetadata.eta`,
        },
      },
    } as IHoudiniSendStatus,
  ];

  return {
    actions,
    id: 'houdini',
    description: 'The first generalized action sequence for performing obfuscation with HoudiniSwap on Mainnet.',
  };
}
