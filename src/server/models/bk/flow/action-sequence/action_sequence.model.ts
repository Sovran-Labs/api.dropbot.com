import mongoose, { Document, Schema } from 'mongoose';
import { IActionSequence } from './action_sequence.interface';
import { IAction } from '@/src/ts/interfaces/action';
import { IProtocol } from '../../../airdrop/airdrop.interface';

const ProtocolSchema = new Schema<IProtocol>({
  actions: [String],
  name: [String],
});

const ActionSchema = new Schema<IAction>({
  name: String,
  dependencies: [Object],
});

const ActionSequenceSchema = new Schema<IActionSequence & Document>({
  actions: [ActionSchema],
  blockchain: String,
  tags: [String],
});

const ActionSequenceModel = mongoose.model<IActionSequence & Document>('ActionSequence', ActionSequenceSchema);

export default ActionSequenceModel;
