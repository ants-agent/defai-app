import { NextRequest, NextResponse } from 'next/server';
import { sendCryptoSummary } from '@/utilities/twitter/crypto-bot';


export async function GET(req: NextRequest) {
  try {
    const result = await sendCryptoSummary();
    return NextResponse.json({ success: true, data: result });

  } catch (error) {
    console.error('Error in crypto summary cron:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 