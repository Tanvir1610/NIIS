import mongoose, { Document, Model } from 'mongoose';

export type ParticipantType = 'attendee' | 'presenter' | 'student' | 'faculty';
export type PaymentStatus = 'pending' | 'verified' | 'rejected';
export type PaperStatus = 'pending' | 'approved' | 'rejected';

export interface IParticipant extends Document {
  name: string;
  email: string;
  phone?: string;
  participantType: ParticipantType;
  track?: string;
  paperTitle?: string;
  university?: string;
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
  transactionId?: string;
  expectedAmount: number;
  paymentStatus: PaymentStatus;
  participantId?: string;
  imageUrl?: string;
  paymentScreenshotUrl?: string;
  paperStatus: PaperStatus;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ParticipantSchema = new mongoose.Schema<IParticipant>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    participantType: {
      type: String,
      enum: ['attendee', 'presenter', 'student', 'faculty'],
      required: true,
    },
    track: { type: String, default: null },
    paperTitle: { type: String, default: null },
    university: { type: String, trim: true, default: null },
    location: {
      city: { type: String, default: null },
      state: { type: String, default: null },
      country: { type: String, default: null },
    },
    transactionId: { type: String, default: null },
    expectedAmount: { type: Number, required: true, default: 0 },
    paymentStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    participantId: { type: String, unique: true, sparse: true },
    imageUrl: { type: String, default: null },
    paymentScreenshotUrl: { type: String, default: null },
    paperStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    remarks: { type: String, default: null },
  },
  { timestamps: true }
);

ParticipantSchema.index({ email: 1 });
ParticipantSchema.index({ participantType: 1 });
ParticipantSchema.index({ paymentStatus: 1 });
ParticipantSchema.index({ track: 1 });

const ParticipantModel: Model<IParticipant> =
  (mongoose.models?.Participant as Model<IParticipant>) ||
  mongoose.model<IParticipant>('Participant', ParticipantSchema);

export default ParticipantModel;
