import mongoose from 'mongoose';
import { IFlow } from './flow.interface';
declare const FlowModel: mongoose.Model<IFlow & mongoose.Document<any, any, any>, {}, {}, {}, mongoose.Document<unknown, {}, IFlow & mongoose.Document<any, any, any>> & IFlow & mongoose.Document<any, any, any> & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default FlowModel;
//# sourceMappingURL=flow.model.d.ts.map