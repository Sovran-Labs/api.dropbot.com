import mongoose from 'mongoose';
import { IToken } from './token.interface';
declare const TokenModel: mongoose.Model<IToken & mongoose.Document<any, any, any>, {}, {}, {}, mongoose.Document<unknown, {}, IToken & mongoose.Document<any, any, any>> & IToken & mongoose.Document<any, any, any> & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default TokenModel;
//# sourceMappingURL=token.model.d.ts.map