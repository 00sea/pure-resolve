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
          <NavigationLink href="/">{'HOME'}</NavigationLink>
          <NavigationLink href="/pathnames">{'ABOUT'}</NavigationLink>
          <NavigationLink href="/pathnames">{'VANCOUVER ISLAND'}</NavigationLink>
          <NavigationLink href="/pathnames">{'PATHNAMES'}</NavigationLink>
        </div>
        <div className="ml-auto">
          <LocaleSwitcher />
        </div>
      </nav>
    </div>
  );
}
