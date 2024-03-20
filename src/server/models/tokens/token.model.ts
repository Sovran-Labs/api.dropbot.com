import mongoose, { Document, Schema } from 'mongoose';
import { IToken } from './token.interface';

const TokenSchema = new Schema<IToken & Document>({
  currentPrice: String,
  decimals: Number,
  name: String,
  nativeBlockchains: {
    String,
  },
  symbol: String,
});

const TokenModel = mongoose.model<IToken & Document>('Token', TokenSchema);

export default TokenModel;
