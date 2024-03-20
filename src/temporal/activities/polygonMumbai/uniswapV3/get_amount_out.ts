import { Pool, QuoteExactInputSingleParams, Token } from './types';

export const get_amount_out = async (
  tokenIn: Token,
  tokenOut: Token,
  amountIn: bigint,
  pool: Pool
): Promise<bigint> => {
  const params: QuoteExactInputSingleParams = {
    tokenIn: tokenIn.address,
    tokenOut: tokenOut.address,
    amountIn,
    fee: pool.fees,
    sqrtPriceLimitX96: BigInt(0),
  };

  const [amountOut] = await pool.Quoter.quoteExactInputSingle.staticCall(params);

  return amountOut;
};
