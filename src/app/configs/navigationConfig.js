import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'home-component',
    title: 'Home',
    translate: 'Home',
    type: 'item',
    url: '/',
  },
  {
    id: 'Seeds-component',
    title: 'Seeds',
    translate: 'Seeds',
    type: 'item',
    url: '/shop/men',
  },
];

export default navigationConfig;
