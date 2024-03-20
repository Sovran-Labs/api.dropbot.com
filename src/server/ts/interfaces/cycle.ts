import mongoose, { Document, Schema } from 'mongoose';
import { ICycle } from '../../models/cycle/cycle';

const CycleSchema = new Schema<ICycle & Document>({
  flow: Schema.Types.Mixed,
  originalFlowId: Schema.ObjectId,
  name: String,
  state: Schema.Types.Mixed,
  description: String,
  createdAt: Number,
  updatedAt: Number,
  schemaVersion: {
    type: String,
    default: '1.0.0',
  },
  txnLog: [String],
  usdCurrentAmount: Number,
  usdCurrentGasSpent: Number,
});

export const CycleModel = mongoose.model<ICycle & Document>('Cycle', CycleSchema);
