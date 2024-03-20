import mongoose from 'mongoose';
import { IMasterKey } from './keys.interface';
declare const MasterKeyModel: mongoose.Model<IMasterKey & mongoose.Document<any, any, any>, {}, {}, {}, mongoose.Document<unknown, {}, IMasterKey & mongoose.Document<any, any, any>> & IMasterKey & mongoose.Document<any, any, any> & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default MasterKeyModel;
//# sourceMappingURL=keys.model.d.ts.map