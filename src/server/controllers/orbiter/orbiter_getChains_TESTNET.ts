import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import OrbiterConfig from '@/src/config/OrbiterConfig';

export const orbiter_getChains_TESTNET = async (
  req: Request<
    null,
    null,
    {
      amount: string;
      from: string;
      to: string;
    }
  >,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log('calling orbiter_getChains_TESTNET...');

    console.log('req.body', req.body);

    const B = req.body;

    const resp = await axios.request({
      method: 'GET',
      url: `${OrbiterConfig.ORBITER_URL_TESTNET}/sdk/chains`,
    });

    res.status(201).json({ message: 'Successfully retrieved chains', chains: resp.data });
  } catch (e) {
    next({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      status: e?.response?.status || 500,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      message: e?.response?.data?.message || 'Internal Server Error',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      stack: e?.stack,
    });
  }
};
