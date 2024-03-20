import { UUID } from 'mongodb';
import { Mixed, Schema } from 'mongoose';

// export type TActionSequence = {
//   actions: { name: string; args: Schema.Types.Mixed; blockchain: TBlockchainName }[];
//   id: string;
// };

export interface IFlow {
  template: {
    actions: {
      name: string;
      inputs: any;
      actionUuid: string;
    }[];
    description: string;
    id: string;
  };
  name: string;
  state: any;
  description: string;
  createdAt: string;
  updatedAt: string;
  schemaVersion: string;
}
