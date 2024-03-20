import { UUID } from 'mongodb';
import { TBlockchainName, TPhaseType, TProtocolName } from '@/src/ts/types';

export interface IActionStatus {
  isCompleted: boolean;
  hasFailed: boolean;
  isInProgress: boolean;
  isNotStarted: boolean;
}

export enum Status {
  hasFailed = 'HAS_FAILED',
  isCompleted = 'IS_COMPLETED',
}

export interface IAction {
  _id?: UUID;
  blockchain: TBlockchainName;
  status: IActionStatus;
  protocol: TProtocolName;
  phaseType: TPhaseType;
}
