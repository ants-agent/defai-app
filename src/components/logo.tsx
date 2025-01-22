import Link from 'next/link';

import { cn } from '@/lib/utils';

import { DynamicImage } from './dynamic-image';

export default function Logo({
  width = 100,
  height = width,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <DynamicImage
      lightSrc="/logo.svg"
      darkSrc="/logo_w.svg"
      alt="Logo"
      width={width}
      height={height}
      className={cn('select-none', className)}
    />
  );
}

interface BrandProps {
  className?: string;
}

export function Brand({ className }: BrandProps) {
  return (
    <Link href="https://antsai.io" target="_blank" className={className}>
      <div className="flex items-center gap-2">
        <Logo width={32} />
        <span className="text-x select-none font-bold">Ants AI</span>
      </div>
    </Link>
  );
}
