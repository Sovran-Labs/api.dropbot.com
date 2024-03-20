import { Request, Response } from 'express';
import HoudiniConfig from '@/src/config/HoudiniConfig';
import axios from 'axios';

export const houdini_getSupportedTokens = async (req: Request<null, null, null>, res: Response): Promise<void> => {
  try {
    console.log('calling houdini_getSupportedTokens...');

    console.log('DEBUG', `${HoudiniConfig.HOUDINI_URL}/tokens`);
    console.log('DEBUG', `${process.env.HOUDINI_SWAP_AUTH_HEADER}`);

    const resp = await axios.request({
      method: 'GET',
      url: `${HoudiniConfig.HOUDINI_URL}/tokens`,
      headers: {
        Authorization: process.env.HOUDINI_SWAP_AUTH_HEADER,
      },
    });

    res.status(201).json({ message: "Successfully retrieved HoudiniSwap's supported tokens", tokens: resp.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
