
chrome.webNavigation.onHistoryStateUpdated.addListener(async () => {
    let tab = await getCurrentTab();
    chrome.tabs.sendMessage(tab.id, 
        {message: "tab_updated", url: tab.url}
    );
})

async function getCurrentTab() {
    let [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    return tab;
}
 