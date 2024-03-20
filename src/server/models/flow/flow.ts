import mongoose, { Document, Schema } from 'mongoose';
import { IFlow } from '@/src/server/ts/interfaces/flow';

const FlowSchema = new Schema<IFlow & Document>({
  template: Schema.Types.Mixed,
  name: String,
  state: Schema.Types.Mixed,
  description: String,
  createdAt: Number,
  updatedAt: Number,
  schemaVersion: {
    type: String,
    default: '1.1.0',
  },
});

export const FlowModel = mongoose.model<IFlow & Document>('Flow', FlowSchema);
