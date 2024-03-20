import { JsonRpcProvider, Wallet, ethers } from 'ethers';
import { get_amounts } from './calldatas';
import { TICKER } from '../config/constant';
import { Chains, CrossChainRouterType, TxTransferArgs } from '../types';
import { evm_transfer } from './transactions/evm_transfer';
import { get_balance, log_routes, not_enough_balance } from './utils';
import { get_chain, get_token, append_network_target } from './utils/bridge';

/**
 * @name swap
 * @param evmSigner     // etherjs Wallet instance
 * @param token         // Address of token to be swapped
 * @param fromChain     // Source network's name
 * @param toChain       // Destination network's name
 * @param amount        // (optional) Amount to be sent
 * @param max           // (optional) If set to true, will try to bridge all the balance of the signer
 * @param network       // (optional) In testnet or mainnet
 *
 */
export const bridge = async (swap: {
  evmSigner: Wallet;
  provider: JsonRpcProvider;
  srcToken: any;
  tgtToken: any;
  srcChain: any;
  tgtChain: any;
  amount?: string;
  max?: boolean;
  crossChainRouter: CrossChainRouterType;
}): Promise<void> => {
  const max = swap.max ?? false;
  const from_signer = swap.evmSigner;

  if (max === false && swap.amount === undefined) throw "You need to specify an amount or set 'max' parameter to true.";

  const from_balance = await get_balance(from_signer, swap.provider, swap.srcToken);

  if (max === false && swap.amount && not_enough_balance(swap.srcToken, swap.amount, from_balance))
    throw `not enough balance of ${swap.srcToken.address} amount is ${swap.amount} but balance is ${from_balance}`;

  const amount = max ? from_balance : swap.amount!;
  const { payAmount, receiveAmount } = get_amounts(
    swap.srcToken,
    swap.crossChainRouter,
    amount,
    max,
    swap.srcChain,
    swap.srcToken,
    swap.tgtChain,
    swap.tgtToken
  );

  // VERY IMPORTANT: we need to append this number to the last 4 digit of our pay amount
  // so the maker will know which network we want to send our tokens to.
  // See: https://docs.orbiter.finance/orbiterfinancesbridgeprotocol ("correct process")
  const network_target = swap.crossChainRouter.vc;

  const final_amount = payAmount.toString().slice(0, -4) + network_target; // IMPORTANT

  const txArgs: TxTransferArgs = {
    evmSigner: swap.evmSigner,
    token: swap.srcToken,
    amount: final_amount,
    fromChain: swap.srcChain,
    toChain: swap.tgtChain,
    crossChainRouter: swap.crossChainRouter,
    network: 'MAINNET',
  };

  /*========================================= TX ================================================================================================*/
  console.log(`\nBridging token ${swap.srcToken.symbol} from ${swap.srcChain.name} to ${swap.tgtChain.name}`);
  //   console.log(
  //     `\tpay amount:     ${ethers.formatUnits(payAmount, swap.crossChainRouter.srcPrecision)} ${TICKER[swap.token]}`
  //   );
  //   console.log(
  //     `\treceive amount: ${ethers.formatUnits(receiveAmount, swap.crossChainRouter.tgtPrecision)} ${TICKER[swap.token]}`
  //   );
  console.log('Withholding fees: ', swap.crossChainRouter?.tradeFee.toString(), 'ETH');
  console.log('Id code:          ', network_target + '');
  log_routes(txArgs);

  await evm_transfer(txArgs);

  /*=============================================================================================================================================*/
};
