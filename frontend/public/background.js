
// Fires when the active tab in a window changes.
// chrome.tabs.onActivated.addListener(async () => {
//     let tab = await getCurrentTab();
//     console.log(tab.url);
// })

// Fired when a tab is updated.
// chrome.tabs.onUpdated.addListener(async () => {
//     let tab = await getCurrentTab();
//     chrome.tabs.sendMessage(tab.id, 
//         {message: "tab_updated", url: tab.url}
//     );
// })

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
 