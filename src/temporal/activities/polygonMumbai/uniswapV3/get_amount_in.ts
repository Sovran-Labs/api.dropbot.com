import { Pool, QuoteExactOutputSingleParams, Token } from './types';

export const get_amount_in = async (
  tokenIn: Token,
  tokenOut: Token,
  amountOut: bigint,
  pool: Pool
): Promise<bigint> => {
  const params: QuoteExactOutputSingleParams = {
    tokenIn: tokenIn.address,
    tokenOut: tokenOut.address,
    amount: amountOut,
    fee: pool.fees,
    sqrtPriceLimitX96: BigInt(0),
  };

  const [amountIn] = await pool.Quoter.quoteExactOutputSingle.staticCall(params);

  return amountIn;
};
