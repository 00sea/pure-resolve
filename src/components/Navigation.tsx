import {useTranslations} from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';
import NavigationLink from './NavigationLink';
import Logo from './Logo';

export default function Navigation() {
  const t = useTranslations('Navigation');

  return (
    <div className="border-b-1 border-slate-400 bg-slate-950">
      <nav className="container flex justify-center p-3 text-white">
        <div className="mr-auto">
          <Logo />
        </div>
        <div className="flex justify-center space-x-5">
          <NavigationLink href="/">{t('home')}</NavigationLink>
          <NavigationLink href="/pathnames">{t('about')}</NavigationLink>
          <NavigationLink href="/pathnames">{t('vanisland')}</NavigationLink>
          <NavigationLink href="/pathnames">{t('pathnames')}</NavigationLink>
        </div>
        <div className="ml-auto">
          <LocaleSwitcher />
        </div>
      </nav>
    </div>
  );
}
