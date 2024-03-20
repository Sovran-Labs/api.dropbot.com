import { FlowModel } from '@/src/server/models/flow/flow';
import { connectDB } from '@/src/temporal/clients/db';
import { polygonRpcProvider } from '@/src/temporal/clients/rpcProviders/polygonRpcProvider';
import assert from 'assert';
import BigNumber from 'bignumber.js';
import { Contract, Wallet, ethers } from 'ethers';
import {
  SWAP_ROUTER_ADDRESS,
  QUOTER_ADDRESS,
  SWAP_ROUTER_ABI,
  QUOTER_ABI,
  FeeAmount,
  POOL_V3_ABI,
  POOL_FACTORY_CONTRACT_ADDRESS,
} from './uniswapV3/config';
import WETH9_ABI from '@/src/abis/weth9';
import { computePoolAddress } from '@uniswap/v3-sdk';
import { Token } from '@uniswap/sdk-core';
import { ChainIds } from '@/src/config/Blockchains';

export async function POLYGON_uniswapV3Swap(args: any): Promise<any> {
  /* --- */
  // STEP 0
  /* --- */
  await connectDB();
  const doc = await FlowModel.findById(args.flowId);
  const { jsonRpcProvider } = await polygonRpcProvider();
  const feeData = await jsonRpcProvider?.getFeeData();
  assert(feeData?.maxFeePerGas && feeData.maxPriorityFeePerGas, 'UNABLE_TO_RETRIEVE_GAS_LIMITS_FROM_PROVIDER');
  const signer = new Wallet(doc?.state?.global?.pk, jsonRpcProvider);
  const preBalance = await jsonRpcProvider?.getBalance(signer.address);
  // Contract Instances
  const swapRouter = new Contract(SWAP_ROUTER_ADDRESS, SWAP_ROUTER_ABI, signer);
  const quoter = new Contract(QUOTER_ADDRESS, QUOTER_ABI, signer);
  const tokenA = new Contract(args.tokenA.address, WETH9_ABI, signer);
  const preTokenABalance = await tokenA.balanceOf(args.account);
  const amountToSwap = BigNumber(preTokenABalance.toString())
    .multipliedBy(args.percentOfTokenABalance / 100)
    .toFixed(0);
  /* --- */
  // STEP 1
  /* --- */
  const currentPoolAddress = await computePoolAddress({
    factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
    tokenA: new Token(
      Number.parseInt(args.tokenA.chainId),
      args.tokenA.address,
      args.tokenA.decimals,
      args.tokenA.symbol,
      args.tokenA.name
    ),
    tokenB: new Token(
      Number.parseInt(args.tokenB.chainId),
      args.tokenB.address,
      args.tokenB.decimals,
      args.tokenB.symbol,
      args.tokenB.name
    ),
    fee: FeeAmount.LOW,
  });
  const poolContract = new ethers.Contract(currentPoolAddress, POOL_V3_ABI, signer);
  const [token0, token1, fee] = await Promise.all([poolContract.token0(), poolContract.token1(), poolContract.fee()]);
  assert(token0 && token1 && fee, `A Uniswap V3 pool for ${args.tokenA.symbol}/${args.tokenB.symbol} was NOT found`);
  /* --- */
  // STEP 2
  /* --- */
  const quoteTxn = await quoter.quoteExactInputSingle.staticCall(token0, token1, fee, amountToSwap, 0);
  console.log('quoteTxn', quoteTxn);
  /* --- */
  // STEP 3 - Approve SwapRouter to deduct WMATIC from our account
  /* --- */
  const approveTxn = await tokenA.approve(SWAP_ROUTER_ADDRESS, amountToSwap);
  await approveTxn.wait(4);
  /* --- */
  // STEP 4 - Execute the swap
  /* --- */
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current UNIX time
  const swapTxn = await swapRouter.exactInputSingle(
    {
      tokenIn: token0,
      tokenOut: token1,
      fee, // Pool fee
      recipient: args.account,
      deadline,
      amountIn: amountToSwap,
      amountOutMinimum: quoteTxn,
      sqrtPriceLimitX96: 0,
    },
    {
      //   value: amountToSwap, // If you want to swap the native token
      value: 0, // If you want to swap tokenA directly
    }
  );
  const swapTxnReceipt = await swapTxn.wait(4);
  /* --- */
  // STEP 5 - Validate results
  /* --- */
  const postTokenABalance = await tokenA.balanceOf(args.account);
  const confirmedTxn = await jsonRpcProvider.getTransaction(swapTxnReceipt.hash);
  let swapTxnFee;
  if (swapTxnReceipt && confirmedTxn && confirmedTxn.gasPrice) {
    swapTxnFee = swapTxnReceipt?.gasUsed * confirmedTxn.gasPrice;
  } else {
    throw 'UNABLE_TO_RETRIEVE_TXN_GAS_PRICE';
  }

  const postBalance = await jsonRpcProvider?.getBalance(signer.address);

  return {
    preBalance,
    postBalance,
    preTokenABalance,
    postTokenABalance,
    swapTxnFee,
  };
}
