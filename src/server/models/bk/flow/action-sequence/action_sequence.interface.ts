import { TBlockchainName } from '../../../../../ts/types';
import { IAction } from '../action/action.interface';

export interface IActionSequence {
  actions: IAction[];
  blockchain: TBlockchainName;
  tags: string[]; //legacy or airdrop
}
