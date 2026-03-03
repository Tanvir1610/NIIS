import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Participant, { IParticipant } from '@/models/Participant';

/**
 * GET /api/test
 * Simple route to test DB connection and create a dummy participant
 */
export async function GET() {
  try {
    await connectDB();

    const dummy: Partial<IParticipant> = {
      name: 'DB Test User',
      email: `test+${Date.now()}@example.com`,
      participantType: 'attendee'
    };

    const doc = await Participant.create(dummy);

    return NextResponse.json({ success: true, data: doc }, { status: 201 });
  } catch (err) {
    console.error('API /api/test error:', err);
    return NextResponse.json({ error: 'DB Test Failed' }, { status: 500 });
  }
}
