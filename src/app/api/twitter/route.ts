import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { twitterHandle, publicKey, timestamp } = await req.json();

    // Validate the input
    if (!twitterHandle || !publicKey) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save to database
    const data = await prisma.userData.create({
      data: {
        twitterHandle,
        publicKey,
        collectedAt: timestamp,
      },
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json(
      { error: 'Failed to save data' },
      { status: 500 }
    );
  }
}