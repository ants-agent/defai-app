export interface Suggestion {
  id: string;
  title: string;
  subtitle: string;
}

export const SUGGESTIONS: Suggestion[] = [
  {
    id: 'launch-token',
    title: 'Initiate a New Token',
    subtitle: 'create and deploy a token on pump.fun',
  },
  {
    id: 'swap-sol-usdc',
    title: 'Exchange 1 SOL for USDC',
    subtitle: 'utilize Jupiter to exchange on Solana',
  },
  {
    id: 'solana-trends',
    title: "Current Trends on Solana",
    subtitle: 'discover the latest market trends',
  },
  {
    id: 'price-feed',
    title: "SOL's Current Price",
    subtitle: 'get the latest price of SOL',
  },
  {
    id: 'top-gainers-last-24h',
    title: 'Leading Gainers in the Past 24h',
    subtitle: 'identify the top gainers over the last 24 hours',
  },
  {
    id: 'check-my-wallet',
    title: 'Review My Wallet',
    subtitle: 'examine your wallet portfolio',
  },
];

export function getRandomSuggestions(count: number): Suggestion[] {
  // Ensure we don't request more items than available
  const safeCount = Math.min(count, SUGGESTIONS.length);
  const startIndex = Math.floor(Date.now() / 1000) % SUGGESTIONS.length;

  // Create a rotated copy of the array starting from startIndex
  const rotatedSuggestions = [
    ...SUGGESTIONS.slice(startIndex),
    ...SUGGESTIONS.slice(0, startIndex),
  ];

  // Return only the first safeCount items
  return rotatedSuggestions.slice(0, safeCount);
}
