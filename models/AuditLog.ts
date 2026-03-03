import mongoose, { Document, Model } from 'mongoose';

export interface IAuditLog extends Document {
    action: string;
    performedBy: mongoose.Types.ObjectId;
    role: string;
    targetId?: string;
    details?: string;
    timestamp: Date;
}

const AuditLogSchema = new mongoose.Schema<IAuditLog>({
    action: { type: String, required: true },
    performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    role: { type: String, required: true },
    targetId: { type: String, default: null },
    details: { type: String, default: null },
    timestamp: { type: Date, default: Date.now },
});

AuditLogSchema.index({ timestamp: -1 });
AuditLogSchema.index({ performedBy: 1 });

const AuditLogModel: Model<IAuditLog> =
    (mongoose.models?.AuditLog as Model<IAuditLog>) ||
    mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);

export default AuditLogModel;
