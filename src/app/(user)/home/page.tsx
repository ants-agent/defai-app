import { Metadata } from 'next';

import { HomeContent } from './home-content';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Decentralized AI Agent Orchestration and Collaboration',
};

export default function HomePage() {
  return <HomeContent />;
}
