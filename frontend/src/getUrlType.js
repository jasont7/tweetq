
export default function getUrlType(url) {
  const urlObj = new URL(url);
  const page = urlObj.pathname.substring(1);
  
  const invalidPages = new Set([
    'explore',
    'notifications',
    'messages',
    'search',
  ]);

  if (page == '' || page == 'home') {
    return {type: 'home'};
  }

  if (!invalidPages.has(page) || page.includes('/status')) {
    const user = page.split('/')[0];
    return {type: 'user', user: user};
  }
  
  return {type: 'invalid'};
}
