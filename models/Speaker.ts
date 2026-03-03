import mongoose, { Document, Model } from 'mongoose';

export interface ISpeaker extends Document {
    name: string;
    designation: string;
    institution: string;
    imageUrl?: string;
    bio?: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const SpeakerSchema = new mongoose.Schema<ISpeaker>(
    {
        name: { type: String, required: true, trim: true },
        designation: { type: String, required: true, trim: true },
        institution: { type: String, required: true, trim: true },
        imageUrl: { type: String },
        bio: { type: String },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const SpeakerModel: Model<ISpeaker> =
    (mongoose.models?.Speaker as Model<ISpeaker>) ||
    mongoose.model<ISpeaker>('Speaker', SpeakerSchema);

export default SpeakerModel;
