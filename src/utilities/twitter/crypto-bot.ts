import { generateText } from 'ai';
import { defaultModel } from '@/ai/providers';

import { postTweet } from '@/utilities/utils_twitter';


async function generateAISummary(): Promise<string> {
  const prompt = `
    You are a crypto news expert. Summarize the most important crypto news for the past 24 hours in a concise, engaging way.
    Focus on the most impactful events and trends.
    You need to use Chinese to format the summary as a tweet (max 240 chars) with the following structure:
    - Brief overview of 2-3 key developments
    - Include relevant cashtags ($BTC, $ETH, etc.)
    - End with relevant hashtags
    
  `;

  const  result  = await generateText({
    model: defaultModel,
    system:
      'You are a professional writer. ' +
      'You write simple, clear, and concise content.',
    prompt: prompt,
  });
  return result.text;
}

export async function sendCryptoSummary() {
  try {
   
    const summary = await generateAISummary();
    
    // Add region emoji and format
    const tweet = `${summary}`;
    
    const response = await postTweet(tweet);
    console.log(`Successfully posted  crypto summary:`, response);
    return response;
  } catch (error) {
    console.error(`Error posting  crypto summary:`, error);
    throw error;
  }
} 