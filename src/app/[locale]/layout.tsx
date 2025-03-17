import {notFound} from 'next/navigation';
import {Locale, hasLocale, NextIntlClientProvider} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {ReactNode, CSSProperties} from 'react';
import {clsx} from 'clsx';
import {Inter, Baskervville} from 'next/font/google';
import {routing} from '@/i18n/routing';
import Navigation from '@/components/Navigation';
import './styles.css';

type Props = {
  children: ReactNode;
  params: Promise<{locale: Locale}>;
};

const inter = Inter({subsets: ['latin']});

export const garamond = Baskervville({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-garamond', // This creates a CSS variable
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata(props: Omit<Props, 'children'>) {
  const {locale} = await props.params;

  const t = await getTranslations({locale, namespace: 'LocaleLayout'});

  return {
    title: t('title')
  };
}

export default async function LocaleLayout({children, params}: Props) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const localeSpecificStyles = {
    de: {
      // Arabic - right-to-left language
      '--font-size-base': '1.05rem',
      '--font-family': '"Noto Sans Arabic", sans-serif',
    },
    zh: {
      // Chinese
      '--font-size-base': '1.1rem',
      '--font-family': '"Noto Sans SC", sans-serif',
    },
    en: {
      // English
      '--font-size-base': '1rem',
      '--font-family': '"Inter", sans-serif',
      '--text-sm': '0.9rem'
    }
  }[locale] || {
    '--font-size-base': '1rem',
    '--font-family': '"Inter", sans-serif',
  };

  return (
    <html className="h-full" lang={locale} style={localeSpecificStyles as CSSProperties}>
      <body className={clsx(inter.className, 'flex h-full flex-col')}>
        <NextIntlClientProvider>
          <Navigation />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
