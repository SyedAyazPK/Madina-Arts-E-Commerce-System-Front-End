const { useEffect } = require('react');

const deepLink = 'medical-globe://AnouncementDetails/642676702e2a5c243c37a5bb';
const fallbackLink =
  'http://play.google.com/store/apps/details?id=com.yourcompany.appname';

export const LaunchApp = (deepLink = '', fallBack = '') => {
  var now = new Date().valueOf();

  useEffect(() => {
    LaunchApp(deepLink, fallbackLink);
  }, []);

  setTimeout(function () {
    if (new Date().valueOf() - now > 100) return;
    window.location = fallBack;
  }, 25);
  window.location = deepLink;
};
