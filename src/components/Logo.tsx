import React from 'react';
import Link from 'next/link';

interface TextLogoProps {
  title?: string;
  tagline?: string;
  href?: string;
  titleClassName?: string;
  taglineClassName?: string;
}

export default function TextLogo({
  title = 'SUNNY SUN',
  tagline = 'Personal Real Estate Corporation',
  href = '/',
  titleClassName = '',
  taglineClassName = ''
}: TextLogoProps) {
  const LogoContent = () => (
    <div className="flex flex-col items-start">
      <span 
        className={`font-garamond text-2xl tracking-tight ${titleClassName}`}
        style={{ fontFamily: 'Baskervville' }}
      >
        {title}
      </span>
      <span 
        className={`text-[0.47rem] font-light tracking-widest ${taglineClassName}`}
        style={{ fontFamily: 'Baskervville' }}
      >
        {tagline}
      </span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="no-underline">
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
}