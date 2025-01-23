import { NextRequest, NextResponse } from 'next/server';
import { postTweet } from '@/utilities/utils_twitter';

export async function GET(req: NextRequest) {
  try {
    const data = await postTweet('Hello World from Twitter API with OAuth 1.0a!');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error posting tweet:', error);
    return NextResponse.json(
      { error: 'Failed to post tweet' },
      { status: 500 }
    );
  }
}

