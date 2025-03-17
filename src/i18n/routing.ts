import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de', 'zh'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/pathnames': {
      de: '/pfadnamen',
      zh: '/pathnames'
    }
  }
});
