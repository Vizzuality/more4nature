import { ComponentProps } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

// import LogoIcon from '@/components/icons/logo';

import M4NLogoAlt from '../../../public/images/m4n-logo-alt@2x.avif';
// import M4NLogoTest from '../../../public/images/m4n-logo-test.png';
import M4NLogo from '../../../public/images/m4n-logo@2x.avif';

export default function AppLogo({
  className,
  variant = 'default',
}: {
  className?: ComponentProps<typeof Link>['className'];
  variant?: 'default' | 'secondary';
}) {
  return (
    <Link href="/" className={cn('', className)}>
      <Image
        src={variant === 'secondary' ? M4NLogoAlt : M4NLogo}
        alt="more4nature logo"
        width={204}
        height={70}
      />
      {/*<LogoIcon />*/}
    </Link>
  );
}
