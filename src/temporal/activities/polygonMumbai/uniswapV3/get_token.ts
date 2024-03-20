import fs from 'fs';
import { CHAIN_ID, TOKENS } from './constants';
import { is_native } from './is_native';
import { Chains, Token } from './types';

export const get_token = async (tokenAddress: string, chain: Chains): Promise<Token> => {
  const FILE_PATH = __dirname + '/./config/tokens/' + chain + '.json';
  let Tokens: { [key: string]: Token } = {};

  if (is_native(tokenAddress, chain)) tokenAddress = TOKENS[chain].weth9;

  try {
    Tokens = await JSON.parse(fs.readFileSync(FILE_PATH).toString('ascii'));
  } catch (error) {
    throw `Error: ${FILE_PATH} do not contains the tokens datas`;
  }

  const token = Object.values(Tokens).find((token: Token) => {
    if (BigInt(token.address) !== BigInt(tokenAddress)) return false;
    if (token.chainId !== CHAIN_ID[chain]) return false;

    return true;
  });

  if (token === undefined)
    throw `Error: Can't find token ${tokenAddress} on network ${chain}, please add it to /Mute/config/tokens.ts`;

  return token;
};
