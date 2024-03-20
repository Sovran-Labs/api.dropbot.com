import { Request, Response } from 'express';

import SyncswapSupportedTokensTestnet from '@/src/config/SyncswapSupportedTokensTestnet.json';

export const syncSwap_getSupportedTokens_TESTNET = async (
  req: Request<null, null, null>,
  res: Response
): Promise<void> => {
  try {
    console.log('calling syncSwap_getSupportedTokens_TESTNET...');

    res
      .status(201)
      .json({ message: "Successfully retrieved SyncSwap's supported tokens", tokens: SyncswapSupportedTokensTestnet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
