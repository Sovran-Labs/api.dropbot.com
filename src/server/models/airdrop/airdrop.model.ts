import mongoose, { Document, Schema } from 'mongoose';
import { IAirdrop, IProtocol, IQualificationTargets, ISnapshots } from './airdrop.interface';

const ProtocolSchema = new Schema<IProtocol>({
    actions: [String],
    name: String
});

const SnapshotsSchema = new Schema<ISnapshots>({
    estimated: Date,
    confirmed: Date
});

const QualificationTargetsSchema = new Schema<IQualificationTargets>({
    trxCount: String,
    trxUsdVolume: String,
    trxsInConsecutiveMonths: Number
});

const AirdropSchema = new Schema<IAirdrop & Document>({
    blockchains: [String],
    protocols: {
        type: [ProtocolSchema],
        required: true,
    },
    name: String,
    qualifyingTargets: QualificationTargetsSchema,
    snapshots: SnapshotsSchema
});

const AirdropModel = mongoose.model<IAirdrop & Document>('Airdrop', AirdropSchema);

export default AirdropModel;


