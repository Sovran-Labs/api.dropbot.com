import { polygonMumbaiRpcProvider } from '@/src/temporal/clients/rpcProviders/polygonMumbaiRpcProvider';
import { connectDB } from '@/src/temporal/clients/db';
import { FlowModel } from '@/src/server/models/flow/flow';
import assert from 'assert';
import { Contract, Wallet, ethers } from 'ethers';

import { computePoolAddress } from '@uniswap/v3-sdk';
import { Token } from '@uniswap/sdk-core';

import BigNumber from 'bignumber.js';
import WETH9_ABI from '@/src/abis/weth9';

import SWAP_ROUTER_ABI from '@/src/temporal/activities/polygonMumbai/uniswapV3/abis/swap_router';

import QUOTER_ABI from '@/src/temporal/activities/polygonMumbai/uniswapV3/abis/quoter';
import POOL_V3_ABI from './uniswapV3/abis/pool_v3';
import { ChainIds } from '@/src/config/Blockchains';

export const POOL_FACTORY_CONTRACT_ADDRESS = '0x1F98431c8aD98523631AE4a59f267346ea31F984'; // https://mumbai.polygonscan.com/address/0x1F98431c8aD98523631AE4a59f267346ea31F984#code
export enum FeeAmount {
  LOWEST = 100,
  LOW = 500,
  MEDIUM = 3000,
  HIGH = 10000,
}

export async function POLYGON_MUMBAI_uniswapV3Swap(args: any): Promise<any> {
  await connectDB();

  // STEP 0 - Prereqs

  const doc = await FlowModel.findById(args.flowId);
  const { jsonRpcProvider } = await polygonMumbaiRpcProvider();
  const feeData = await jsonRpcProvider?.getFeeData();

  assert(feeData?.maxFeePerGas && feeData.maxPriorityFeePerGas, 'UNABLE_TO_RETRIEVE_GAS_LIMITS_FROM_PROVIDER');

  const signer = new Wallet(doc?.state?.global?.pk, jsonRpcProvider);
  const preBalance = await jsonRpcProvider?.getBalance(signer.address);

  const amountToSwap = BigNumber(preBalance.toString())
    .multipliedBy(args.percentOfBalance / 100)
    .toFixed(0);

  console.log(BigNumber(amountToSwap).dividedBy(BigNumber(preBalance.toString())));

  // Uniswap V3 Contract Addresses and ABIs (on Polygon Mumbai)
  const swapRouterAddress = '0xE592427A0AEce92De3Edee1F18E0157C05861564'; // SOURCE: https://docs.uniswap.org/contracts/v3/reference/deployments
  const quoterAddress = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6'; // SOURCE: https://docs.uniswap.org/contracts/v3/reference/deployments
  const swapRouterABI = SWAP_ROUTER_ABI;
  const quoterABI = QUOTER_ABI;

  // Contract Instances
  const swapRouter = new Contract(swapRouterAddress, swapRouterABI, signer);
  const quoter = new Contract(quoterAddress, quoterABI, signer);

  const wmatic = new Contract(args.wrappedNativeTokenAddress, WETH9_ABI, signer);
  const preWMATICBalance = await wmatic.balanceOf(args.account);

  // STEP 1 - Validate a liquidity pool exists
  const currentPoolAddress = await computePoolAddress({
    factoryAddress: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
    tokenA: new Token(
      Number.parseInt(ChainIds.POLYGON_MUMBAI),
      '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889', // WMATIC on Polygon Mumbai
      18,
      'WMATIC',
      'Wrapped Matic'
    ),
    tokenB: new Token(
      Number.parseInt(ChainIds.POLYGON_MUMBAI),
      '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa', // WETH Proxy Delegate on Polygon Mumbai
      18,
      'WETH',
      'Wrapped Ether'
    ),
    fee: FeeAmount.LOW,
  });

  const poolContract = new ethers.Contract(currentPoolAddress, POOL_V3_ABI, signer);
  console.log('poolContract', poolContract);

  const [token0, token1, fee] = await Promise.all([poolContract.token0(), poolContract.token1(), poolContract.fee()]);

  assert(token0 && token1 && fee, `A Uniswap V3 pool for 'WMATIC/ETH' was NOT found`);

  // STEP 2 - Check the exchange rate of the pool (TODO: Validate exchange rate is good by double checking with offchain oracle)

  const txn1 = await quoter.quoteExactInputSingle.staticCall(
    token0, // WMATIC
    token1, // WETH
    fee,
    amountToSwap,
    0
  );

  console.log('txn1', txn1);

  // STEP 3 - Approve SwapRouter to deduct WMATIC from our account
  const approveTxn = await wmatic.approve(swapRouterAddress, amountToSwap);
  approveTxn.wait(4);

  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current UNIX time

  // STEP 4 - Execute the swap
  const tx = await swapRouter.exactInputSingle(
    {
      tokenIn: token0,
      tokenOut: token1,
      fee, // Pool fee
      recipient: args.account,
      deadline,
      amountIn: amountToSwap,
      amountOutMinimum: txn1,
      sqrtPriceLimitX96: 0,
    },
    {
      //   value: amountToSwap,
      value: 0,
    }
  );

  console.log('Transaction sent:', tx.hash);

  const receipt = await tx.wait(4);
  console.log('Transaction confirmed:', receipt);

  // STEP 5 - Validate expectations

  const postWMATICBalance = await wmatic.balanceOf(args.account);
  const postBalance = await jsonRpcProvider?.getBalance(signer.address);

  const confirmedTxn = await jsonRpcProvider.getTransaction(receipt.hash);

  let txnFee;
  if (receipt && confirmedTxn && confirmedTxn.gasPrice) {
    txnFee = receipt?.gasUsed * confirmedTxn.gasPrice;
  } else {
    throw 'UNABLE_TO_RETRIEVE_TXN_GAS_PRICE';
  }

  //   assert(
  //     BigInt(preBalance) - BigInt(postBalance) - BigInt(txnFee) - BigInt(amountToSwap) === BigInt(0),
  //     `Difference in balance of MATIC after the swap minus txn fees should equal the swapped amount`
  //   );

  return {
    preWMATICBalance,
    preBalance,
    postWMATICBalance,
    postBalance,
    amountToSwap,
    differenceInBalance: (BigInt(preBalance) - BigInt(postBalance)).toString(),
    // differenceInBalanceMinusTxnFee: (BigInt(preBalance) - BigInt(postBalance) - BigInt(txnFee)).toString(),
    // shouldBeZero: (BigInt(preBalance) - BigInt(postBalance) - BigInt(txnFee) - BigInt(amountToSwap)).toString(),
    // txnFee,
    explorerLink: `https://mumbai.polygonscan.com/tx/${receipt.hash}`,
  };
}
