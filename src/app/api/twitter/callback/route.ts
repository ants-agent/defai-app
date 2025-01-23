import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const verifier = req.cookies.get('code_verifier')?.value;

    if (!code || !verifier) {
      return NextResponse.json({ error: 'Missing code or verifier' }, { status: 400 });
    }

    // Exchange code for token
    const tokenResponse = await fetch('https://api.twitter.com/2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        grant_type: 'authorization_code',
        client_id: process.env.TWITTER_CLIENT_ID!,
        redirect_uri: 'http://127.0.0.1:3002',
        code_verifier: verifier,
      }),
    });

    const tokens = await tokenResponse.json();

    // Store tokens securely and redirect to success page
    const response = NextResponse.redirect('/twitter-success');
    response.cookies.delete('code_verifier');
    
    // Store access token securely
    response.cookies.set('twitter_token', tokens.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax'
    });

    return response;
  } catch (error) {
    console.error('Token exchange error:', error);
    return NextResponse.redirect('/twitter-error');
  }
} 