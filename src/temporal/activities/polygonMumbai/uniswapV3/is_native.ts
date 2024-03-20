import { TOKENS } from './constants';
import { Chains } from './types';

export const is_native = (token: string, chain: Chains): boolean => {
  if (token === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') return true;
  if (token === TOKENS[chain].weth9) return true;

  return false;
};
