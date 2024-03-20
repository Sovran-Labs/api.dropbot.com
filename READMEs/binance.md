# tl;dr 

getLiquidityPairBSC.ts:

    -Retrieves the wallet using the getWallet helper function.

    -Gets Uniswap V3 factory, swap router, and quoter contract instances for BSC.

    -Fetches token addresses for BNB and USDC directly from the TOKENS object.

    -Checks if the BNB/USDC pair exists on Uniswap V3 using the factory.getPair method.

    -Retrieves liquidity amounts for the pair using the quoter.getReserves method.

    -Sets minimum acceptable liquidity amounts for BNB and USDC.

    -Checks if liquidity is sufficient.

Uniswap V3 does not require specific liquidity pair contracts like Uniswap V2.

## next steps:

pre-check:
    -ensure wallets are funding and account for topping up, depending on gas fees
    
    -verify the contract addresses of token pairs so that the swaps are successful

post check:
    -check wallet balances and liquidity after swaps

    -display transactions, pair, and liquidity in frontend ui

    -optionally consider gas limits

Duplicate swap checks and handle swaps on SushiswapV3.

Confer on swap flow, integrating automated swap checks with orbiter bridge and rebalancing to Weth (bridge to ZKsync). Handle receiving funds from Polygon. Implement other required helpers for the binance swaps. Minimize houdini/xblocks swaps.