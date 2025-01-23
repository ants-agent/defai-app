'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useLogin } from '@privy-io/react-auth';
import { GitHubLogoIcon, DiscordLogoIcon } from '@radix-ui/react-icons';
import { RiTwitterXFill } from '@remixicon/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ActivityIcon,
  BookOpenIcon,
  BrainCircuitIcon,
  LinkIcon,
  School,
  Cable,
  ShieldIcon,
  ZapIcon,
  ClipboardCheck
} from 'lucide-react';

import { Brand } from '@/components/logo';
import { AiParticlesBackground } from '@/components/ui/ai-particles-background';
import BlurFade from '@/components/ui/blur-fade';
import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';


const navItems = [
  { label: 'Recruiting', href: '/recruiting', icon: ClipboardCheck, target: '_self' },
  { label: 'Github', href: 'https://git.new/ants-agent', icon: GitHubLogoIcon, target: '_blank' },
  { label: 'Discord', href: 'https://dub.sh/antsai', icon: DiscordLogoIcon, target: '_blank' },
  { label: 'Docs', href: 'https://docs.antsai.io', icon: BookOpenIcon, target: '_blank' },
];

const Header = ({ handleLogin }: { handleLogin: () => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <BlurFade delay={0.1} className="relative z-50">
      <header className="fixed left-0 right-0 top-0">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="rounded-xl border border-border/50 bg-muted/70 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between px-4 py-2">
              <div className="relative">
                <Brand className="scale-95 transition-opacity hover:opacity-80" />
              </div>

              <nav className="hidden md:ml-auto md:mr-8 md:flex">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.target}
                      rel="noopener noreferrer"
                      className="group relative flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                      <span className="absolute inset-x-4 -bottom-px h-px scale-x-0 bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0 transition-transform duration-300 group-hover:scale-x-100" />
                    </a>
                  );
                })}
              </nav>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="h-9 rounded-lg px-4 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                  onClick={handleLogin}
                >
                  Login 🐜
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 md:hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="absolute left-4 right-4 top-full mt-2 rounded-lg border border-border/50 bg-background/95 p-3 shadow-lg backdrop-blur-md md:hidden">
              <nav className="flex flex-col gap-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </header>
    </BlurFade>
  );
};

const Hero = ({ handleLogin }: { handleLogin: () => void }) => {
  const productRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: productRef,
    offset: ['start end', 'end start'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5], [30, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);

  return (
    <section className="relative pt-[5.75rem]" ref={productRef}>

      <div className="relative w-full">
        <BlurFade delay={0.6} className="mx-auto max-w-screen-2xl px-6">
          <div className="relative">
            {/* Product images */}
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              style={{
                rotateX,
                scale,
                opacity,
                transformPerspective: 1000,
              }}
              transition={{
                type: 'spring',
                stiffness: 50,
                damping: 20,
                delay: 0.5,
              }}
              className="relative mx-auto w-full max-w-[1200px] will-change-transform"
            >
              <div className="group relative overflow-hidden rounded-2xl border bg-card shadow-2xl">
                {/* Light mode image */}
                <div className="relative dark:hidden">
                  <Image
                    src="/banner-2to1.png"
                    alt="Ants AI Interface"
                    width={1200}
                    height={675}
                    className="w-full rounded-2xl"
                    priority
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                      onClick={handleLogin}
                      className="px-10 py-6 bg-blue-500 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg transform transition hover:scale-105"
                    >
                      Login to Try Ants AI
                    </button>
                  </div>
                </div>
                {/* Dark mode image */}
                <div className="relative hidden dark:block">
                  <Image
                    src="/banner-2to1.png"
                    alt="Ants AI Interface"
                    width={1200}
                    height={675}
                    className="w-full rounded-2xl"
                    priority
                  />
                </div>
                <BorderBeam
                  className="opacity-0 group-hover:opacity-100"
                  duration={10}
                  size={300}
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -left-4 -top-4 h-72 w-72 animate-blob rounded-full bg-primary/5 mix-blend-multiply blur-xl" />
              <div className="animation-delay-2000 absolute -right-4 -top-4 h-72 w-72 animate-blob rounded-full bg-secondary/5 mix-blend-multiply blur-xl" />
            </motion.div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};




const Footer = () => {
  return (
    <footer className="mt-auto py-4">
      <BlurFade
        delay={0.5}
        className="flex items-center justify-center gap-3 text-sm text-muted-foreground"
      >
        <p>© {new Date().getFullYear()} 🐜 Ants AI. All rights reserved.</p>
        <span>|</span>
        <Link
          href="https://x.com/realantsai"
          target="_blank"
          title="Follow us on X"
          className="transition-colors hover:scale-105 hover:text-primary"
        >
          <RiTwitterXFill className="h-4 w-4" />
        </Link>
      </BlurFade>
    </footer>
  );
};

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
      <AiParticlesBackground />
      <Header handleLogin={login} />
      <main className="flex-1">
        <Hero handleLogin={login} />
      </main>
      <Footer />
    </div>
  );
}
