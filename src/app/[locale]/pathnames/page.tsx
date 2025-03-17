import {Locale, useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {use} from 'react';
import PageLayout from '@/components/PageLayout';

type Props = {
  params: Promise<{locale: Locale}>;
};

export default function PathnamesPage({params}: Props) {
  const {locale} = use(params);

  const carouselImages = [
    {src: '/images/image1.jpg', alt: 'Background image 1'},
    {src: '/images/image2.png', alt: 'Background image 2'},
    {src: '/images/image3.png', alt: 'Background image 3'},
  ];

  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('PathnamesPage');

  return (
    <PageLayout title={t('title')} carouselImages={carouselImages}>
      <div className="max-w-[490px]">
        {t.rich('description', {
          p: (chunks) => <p className="mt-4">{chunks}</p>,
          code: (chunks) => (
            <code className="font-mono text-white">{chunks}</code>
          )
        })}
      </div>
    </PageLayout>
  );
}
