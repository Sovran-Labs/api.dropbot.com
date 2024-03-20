import { Request, Response, NextFunction } from 'express';
import HoudiniConfig from '@/src/config/HoudiniConfig';
import assert from 'assert';
import axios from 'axios';

export const houdini_getQuote = async (
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
    console.log('calling houdini_getQuote...');

    // debugger;

    console.log('req.body', req.body);

    const B = req.body;

    // debugger;

    const resp = await axios.request({
      method: 'GET',
      url: `${HoudiniConfig.HOUDINI_URL}/quote`,
      headers: {
        Authorization: process.env.HOUDINI_SWAP_AUTH_HEADER,
        'Content-Type': 'application/json',
      },
      data: {
        amount: B.amount,
        from: B.from,
        to: B.to,
        anonymous: true,
      },
    });

    // debugger;

    // const metadata = {
    //   amount: B.amount,
    //   from: B.from,
    //   to: B.to,
    //   anonymous: true,
    //   ip: '0.0.0.0',
    //   userAgent: '',
    //   quote: resp.data,
    // };

    res.status(201).json({ message: 'Successfully retrieved quote', quote: resp.data });
  } catch (e) {
    // debugger;

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
