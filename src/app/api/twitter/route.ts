import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Generate PKCE challenge pair
function generatePKCE() {
  // Generate random verifier
  const verifier = crypto.randomBytes(32).toString('base64url');
  
  // Generate challenge from verifier
  const challenge = crypto
    .createHash('sha256')
    .update(verifier)
    .digest('base64url');

  return { verifier, challenge };
}

export async function GET(req: NextRequest) {
  try {
    const { verifier, challenge } = generatePKCE();
    
    // Store verifier in session/cookie to use later
    // You might want to use a more secure storage method
    const response = NextResponse.redirect(getAuthUrl(challenge));
    response.cookies.set('code_verifier', verifier, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax'
    });
    
    return response;
  } catch (error) {
    console.error('Twitter OAuth error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}

function getAuthUrl(challenge: string) {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.TWITTER_CLIENT_ID!,
    redirect_uri: 'http://127.0.0.1:3002/api/twitter/callback',
    scope: 'tweet.read tweet.write users.read users.write ',
    state: crypto.randomBytes(16).toString('hex'),
    code_challenge: challenge,
    code_challenge_method: 'S256'
  });

  return `https://twitter.com/i/oauth2/authorize?${params.toString()}`;
}

