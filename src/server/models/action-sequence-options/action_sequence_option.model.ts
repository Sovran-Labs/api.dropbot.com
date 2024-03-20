import mongoose, { Document, Schema } from 'mongoose';
import { IActionSequenceOption } from './action_sequence_option.interface';

const SequenceOptionSchema = new Schema<IActionSequenceOption & Document>({
  actions: {
    String,
  },
  name: String,
});

const SequenceOptionModel = mongoose.model<IActionSequenceOption & Document>('SequenceOption', SequenceOptionSchema);

export default SequenceOptionModel;
