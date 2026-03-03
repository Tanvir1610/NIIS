import mongoose, { Document, Model } from 'mongoose';

export interface ICommitteeMember extends Document {
    name: string;
    designation: string;
    institution: string;
    category: 'technical_advisory' | 'organizing' | 'steering';
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const CommitteeMemberSchema = new mongoose.Schema<ICommitteeMember>(
    {
        name: { type: String, required: true, trim: true },
        designation: { type: String, required: true, trim: true },
        institution: { type: String, required: true, trim: true },
        category: {
            type: String,
            enum: ['technical_advisory', 'organizing', 'steering'],
            default: 'technical_advisory'
        },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const CommitteeMemberModel: Model<ICommitteeMember> =
    (mongoose.models?.CommitteeMember as Model<ICommitteeMember>) ||
    mongoose.model<ICommitteeMember>('CommitteeMember', CommitteeMemberSchema);

export default CommitteeMemberModel;
