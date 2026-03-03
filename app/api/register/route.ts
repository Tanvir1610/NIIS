import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Participant from '@/models/Participant';

/**
 * POST /api/register
 * Expects JSON body with at least: { name, email, participantType }
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, participantType } = body || {};

    if (!name || !email || !participantType) {
      return NextResponse.json({ error: 'Missing required fields: name, email, participantType' }, { status: 400 });
    }

    await connectDB();

    const toSave = {
      name,
      email,
      participantType,
      phone: body.phone,
      track: body.track,
      paperTitle: body.paperTitle,
      transactionId: body.transactionId,
      imageUrl: body.imageUrl,
      paymentStatus: body.paymentStatus || undefined,
      participantId: body.participantId
    };

    const participant = new Participant(toSave);
    await participant.save();

    return NextResponse.json({ success: true, data: participant }, { status: 201 });
  } catch (err) {
    console.error('API /api/register error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
