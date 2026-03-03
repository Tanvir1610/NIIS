import mongoose, { Document, Model } from 'mongoose';

export interface ICounter extends Document {
    name: string;
    seq: number;
}

const CounterSchema = new mongoose.Schema<ICounter>({
    name: { type: String, required: true, unique: true },
    seq: { type: Number, default: 0 },
});

const CounterModel: Model<ICounter> =
    (mongoose.models?.Counter as Model<ICounter>) ||
    mongoose.model<ICounter>('Counter', CounterSchema);

/**
 * Get the next auto-increment sequence value.
 * Returns a zero-padded string like "0001", "0002", etc.
 */
export async function getNextParticipantId(): Promise<string> {
    const counter = await CounterModel.findOneAndUpdate(
        { name: 'participantId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return `NIIS2026-${String(counter.seq).padStart(4, '0')}`;
}

export default CounterModel;
