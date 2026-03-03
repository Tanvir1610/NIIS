/**
 * Seed script — creates the default roles for the user (convener, track_coordinator, accountant).
 *
 * Usage:  npx tsx scripts/seed.ts
 *
 * Requires MONGODB_URI in .env.local (loaded automatically by dotenv).
 */

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env.local from project root
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') });

async function seed() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error('❌ MONGODB_URI not found. Make sure .env.local exists.');
        process.exit(1);
    }

    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');

    // Dynamically import after dotenv so JWT_SECRET is available
    const bcrypt = await import('bcryptjs');

    const UserModel = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['convener', 'track_coordinator', 'accountant'], required: true },
        assignedTrack: { type: String, default: null },
    }, { timestamps: true }));

    // Create Convener
    const convenerEmail = 'convener@niis.com';
    const existingConvener = await UserModel.findOne({ email: convenerEmail });
    if (existingConvener) {
        console.log(`⚠️  User "${convenerEmail}" already exists. Skipping.`);
    } else {
        const hashedPassword = await bcrypt.hash('convener', 12);
        await UserModel.create({
            name: 'Convener Dev',
            email: convenerEmail,
            password: hashedPassword,
            role: 'convener',
        });
        console.log(`✅ Created convener user: ${convenerEmail} / convener`);
    }

    // Create Accountant
    const accountantEmail = 'accountant@niis.com';
    const existingAccountant = await UserModel.findOne({ email: accountantEmail });
    if (existingAccountant) {
        console.log(`⚠️  User "${accountantEmail}" already exists. Skipping.`);
    } else {
        const hashedPassword = await bcrypt.hash('accountant', 12);
        await UserModel.create({
            name: 'Accountant Dev',
            email: accountantEmail,
            password: hashedPassword,
            role: 'accountant',
        });
        console.log(`✅ Created accountant user: ${accountantEmail} / accountant`);
    }

    // Create Track Coordinator
    const trackEmail = 'track@niis.com';
    const existingTrack = await UserModel.findOne({ email: trackEmail });
    if (existingTrack) {
        console.log(`⚠️  User "${trackEmail}" already exists. Skipping.`);
    } else {
        const hashedPassword = await bcrypt.hash('track', 12);
        await UserModel.create({
            name: 'Track Coordinator Dev',
            email: trackEmail,
            password: hashedPassword,
            role: 'track_coordinator',
            assignedTrack: 'Track 1: Artificial Intelligence & Machine Learning',
        });
        console.log(`✅ Created track coordinator user: ${trackEmail} / track`);
    }

    await mongoose.disconnect();
    console.log('✅ Done. You can now log in at /admin/login');
}

seed().catch((err) => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
});
