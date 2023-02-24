
async function getCurrentTab() {
  let [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  return tab;
}

chrome.webNavigation.onHistoryStateUpdated.addListener(async () => {
  let tab = await getCurrentTab();
  chrome.tabs.sendMessage(tab.id, 
    {message: "tab_updated", url: tab.url}
  );
})

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    if (details.url.startsWith("https://api.twitter.com/1.1")) {
      chrome.tabs.sendMessage(details.tabId,
        {message: "request_headers", payload: details.requestHeaders}
      );
    }
  },
  {urls: ["https://api.twitter.com/1.1/*"]},
  ['requestHeaders']
);
