import { NextRequest, NextResponse } from 'next/server';
import { sendCryptoSummary } from '@/utilities/twitter/crypto-bot';
import { verifyUser } from '@/server/actions/user';

export async function GET(req: NextRequest) {
  try {
    

    // Get the timezone from query params
    const timezone = req.nextUrl.searchParams.get('timezone');
    if (!timezone || !['ASIA', 'EUROPE', 'NA'].includes(timezone)) {
      return NextResponse.json({ error: 'Invalid timezone' }, { status: 400 });
    }

    const result = await sendCryptoSummary(timezone as 'ASIA' | 'EUROPE' | 'NA');
    return NextResponse.json({ success: true, data: result });

  } catch (error) {
    console.error('Error in crypto summary cron:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 