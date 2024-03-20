import mongoose from 'mongoose';
import { IWallet } from './wallet.interface';
declare const WalletModel: mongoose.Model<IWallet & mongoose.Document<any, any, any>, {}, {}, {}, mongoose.Document<unknown, {}, IWallet & mongoose.Document<any, any, any>> & IWallet & mongoose.Document<any, any, any> & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default WalletModel;
//# sourceMappingURL=wallet.model.d.ts.map