import {useTranslations} from 'next-intl';
import {ReactNode} from 'react';
import ExternalLink from './ExternalLink';
import BackgroundCarousel from './BackgroundCarousel'; // New import

type Props = {
  children?: ReactNode;
  title: ReactNode;
  carouselImages?: {src: string; alt: string}[]; // Optional prop for carousel images
};

export default function PageLayout({children, title, carouselImages}: Props) {
  const t = useTranslations('PageLayout');

  return (
    <div className="relative flex grow flex-col bg-black py-36">
      {/* Background Carousel */}
      {carouselImages && carouselImages.length > 0 && (
        <div className="absolute inset-0 overflow-hidden z-0">
          <BackgroundCarousel images={carouselImages} />
          {/* Add an overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
      )}
      
      {/* Content (positioned above the carousel) */}
      <div className="container relative z-10 flex grow flex-col px-4">
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
          {title}
        </h1>
        <div className="mt-6 text-gray-400 md:text-lg">{children}</div>
        <div className="mt-auto grid grid-cols-1 gap-4 pt-20 md:grid-cols-2 lg:gap-12">
          <ExternalLink
            description={t('links.docs.description')}
            href={t('links.docs.href')}
            title={t('links.docs.title')}
          />
          <ExternalLink
            description={t('links.source.description')}
            href={t('links.source.href')}
            title={t('links.source.title')}
          />
        </div>
      </div>
    </div>
  );
}