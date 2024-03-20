import { Document, UUID } from 'mongodb';
import mongoose, { Mixed, Schema } from 'mongoose';

// export type TActionSequence = {
//   actions: { name: string; args: Schema.Types.Mixed; blockchain: TBlockchainName }[];
//   id: string;
// };

export interface ICycle {
  flow: {
    actions: {
      name: string;
      inputs: any;
      actionUuid: string;
    }[];
    description: string;
    id: string;
  };
  originalFlowId: string;
  name: string;
  state: any;
  description: string;
  createdAt: string;
  updatedAt: string;
  schemaVersion: string;
  txnLog: string[];
  usdCurrentAmount: number;
  usdCurrentGasSpent: number;
}
