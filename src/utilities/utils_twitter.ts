import crypto from 'crypto';

export function generateOAuthSignature(method: string, url: string, params: Record<string, string>) {
  const consumerKey = process.env.TWITTER_CONSUMER_KEY!;
  const consumerSecret = process.env.TWITTER_CONSUMER_SECRET!;
  const accessToken = process.env.TWITTER_ACCESS_TOKEN!;
  const accessSecret = process.env.TWITTER_ACCESS_SECRET!;

  // Add OAuth params
  const oauthParams = {
    oauth_consumer_key: consumerKey,
    oauth_nonce: crypto.randomBytes(16).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: accessToken,
    oauth_version: '1.0',
    ...params
  };

  // Create signature base string
  const baseParams = new URLSearchParams(oauthParams);
  baseParams.sort();
  const baseString = [
    method,
    encodeURIComponent(url),
    encodeURIComponent(baseParams.toString())
  ].join('&');

  // Create signing key
  const signingKey = `${encodeURIComponent(consumerSecret)}&${encodeURIComponent(accessSecret)}`;

  // Generate signature
  const signature = crypto
    .createHmac('sha1', signingKey)
    .update(baseString)
    .digest('base64');

  return {
    ...oauthParams,
    oauth_signature: signature
  };
}

export async function postTweet(text: string) {
  const url = 'https://api.twitter.com/2/tweets';
  const oauthParams = generateOAuthSignature('POST', url, {});

  // Create OAuth header
  const authHeader = 'OAuth ' + Object.entries(oauthParams)
    .map(([key, value]) => `${encodeURIComponent(key)}="${encodeURIComponent(value)}"`)
    .join(', ');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(JSON.stringify(error));
  }

  return response.json();
} 