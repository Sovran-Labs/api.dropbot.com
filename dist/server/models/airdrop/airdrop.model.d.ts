import mongoose from 'mongoose';
import { IAirdrop } from './airdrop.interface';
declare const AirdropModel: mongoose.Model<IAirdrop & mongoose.Document<any, any, any>, {}, {}, {}, mongoose.Document<unknown, {}, IAirdrop & mongoose.Document<any, any, any>> & IAirdrop & mongoose.Document<any, any, any> & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default AirdropModel;
//# sourceMappingURL=airdrop.model.d.ts.map