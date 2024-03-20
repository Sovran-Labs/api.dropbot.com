import mongoose from 'mongoose';
import { ICapital, IUser } from './user.interface';
declare const CapitalSchema: mongoose.Schema<ICapital, mongoose.Model<ICapital, any, any, any, mongoose.Document<unknown, any, ICapital> & ICapital & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ICapital, mongoose.Document<unknown, {}, mongoose.FlatRecord<ICapital>> & mongoose.FlatRecord<ICapital> & {
    _id: mongoose.Types.ObjectId;
}>;
declare const UserModel: mongoose.Model<IUser & mongoose.Document<any, any, any>, {}, {}, {}, mongoose.Document<unknown, {}, IUser & mongoose.Document<any, any, any>> & IUser & mongoose.Document<any, any, any> & {
    _id: mongoose.Types.ObjectId;
}, any>;
export { CapitalSchema, UserModel };
//# sourceMappingURL=user.model.d.ts.map