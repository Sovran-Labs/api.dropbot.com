import { Request, Response } from 'express';

import SyncswapSupportedTokensMainnet from '@/src/config/SyncswapSupportedTokensMainnet.json';

export const syncSwap_getSupportedTokens_MAINNET = async (
  req: Request<null, null, null>,
  res: Response
): Promise<void> => {
  try {
    console.log('calling syncSwap_getSupportedTokens_MAINNET...');

    res
      .status(201)
      .json({ message: "Successfully retrieved SyncSwap's supported tokens", tokens: SyncswapSupportedTokensMainnet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
