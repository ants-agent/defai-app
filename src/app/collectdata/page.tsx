'use client';


import { Header, Footer } from '@/app/page';
import { useRouter } from 'next/navigation';
import { useLogin, usePrivy, useWallets } from '@privy-io/react-auth';
import { AiParticlesBackground } from '@/components/ui/ai-particles-background';
import { CollectDataPage } from '@/app/collectdata/collectdata_content';


export default function Home() {
  const router = useRouter();
  let { login } = useLogin({
    onComplete: (user) => {
      router.push('/collectdata');
    },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <AiParticlesBackground />
      <Header handleLogin={login} />
      <main className="flex-grow">
        <CollectDataPage />
      </main>
      <Footer />
    </div>
  );
}