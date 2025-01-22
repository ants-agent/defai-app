'use client';

import { Card } from '@/components/ui/card';
import { Header, Footer } from '@/app/page';
import { useRouter } from 'next/navigation';
import { useLogin } from '@privy-io/react-auth';
import { AiParticlesBackground } from '@/components/ui/ai-particles-background';

const RecruitingPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
     
     

      {/* Page content */}
      <div className="flex flex-1 flex-col py-8 mt-12">
        <div className="w-full px-8">
          <div className="mx-auto max-w-3xl space-y-6">
            <Card className="bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">Open Position</h2>
              <p className="text-muted-foreground">
               Full-stack Developer
              </p>
            </Card>

            <Card className="bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">Why Join Us?</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We're building the future of blockchain technology and AI and we need passionate people to help us get there.
                </p>
                <ul className="list-inside list-disc space-y-2">
                  <li>Work with cutting-edge technology</li>
                  <li>Flexible remote work environment</li>
                  <li>Competitive compensation</li>
                  <li>Opportunity to shape the future of web3 and AI</li>
                </ul>
              </div>
            </Card>

            <Card className="bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">Contact Us</h2>
              <p className="text-muted-foreground">
                Interested in joining our team? Send your resume to{' '}
                <a
                  href="mailto:0xantsai@gmail.com"
                  className="text-primary hover:underline"
                >
                  0xantsai@gmail.com
                </a>
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function Home() {
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
  const router = useRouter();
  let { login } = useLogin({
    onComplete: (
      user,
      isNewUser,
      wasAlreadyAuthenticated,
      loginMethod,
      loginAccount,
    ) => {
      console.log("onComplete, isNewUser: ", isNewUser)
      router.push('/home');
    },
  });
  console.log('isMaintenanceMode', isMaintenanceMode)

  if (isMaintenanceMode) {
    login = () => {
      window.location.href = 'https://x.com/realantsai';
    };
  }
  return (
    <div className="flex flex-col">
      {/* Temporarily disabled particle background */}
       <AiParticlesBackground />
      <Header handleLogin={login} />
     
       <RecruitingPage />
     
      <Footer />
    </div>
  );
};
