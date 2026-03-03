import mongoose, { Document, Model } from 'mongoose';

export type UserRole = 'convener' | 'track_coordinator' | 'accountant';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  assignedTrack?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['convener', 'track_coordinator', 'accountant'],
      required: true,
    },
    assignedTrack: { type: String, default: null },
  },
  { timestamps: true }
);

// Index for fast lookups
UserSchema.index({ email: 1 });

const UserModel: Model<IUser> =
  (mongoose.models?.User as Model<IUser>) ||
  mongoose.model<IUser>('User', UserSchema);

export default UserModel;
