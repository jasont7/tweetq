
export default function getUrlType(url) {
  const urlObj = new URL(url);
  const page = urlObj.pathname.substring(1).split('/')[0];
  
  const invalidPages = new Set([
    'i',
    'explore',
    'notifications',
    'messages',
    'search',
    'settings',
  ]);

  if (page == '' || page == 'home') {
    return {type: 'home'};
  }

  if (!invalidPages.has(page)) {
    const user = page.split('/')[0];
    return {type: 'user', user: user};
  }
  
  return {type: 'invalid'};
}
