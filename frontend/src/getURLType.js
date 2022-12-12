
export default function getURLType(url) {
    const urlObj = new URL(url);
    const page = urlObj.pathname.substring(1);
    
    const invalidPages = new Set([
        'explore',
        'notifications',
        'messages',
    ]);

    if (page == '' || page == 'home') {
        return {type: 'home'}
    } else if (invalidPages.has(page) || page.includes('/')) {
        return {type: 'invalid'}
    } else {
        return {type: 'user', user: page}
    }
}
