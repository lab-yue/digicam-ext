// @ts-ignore
chrome.tabs.onUpdated.addListener((tabId, _, tab) => {
  // @ts-ignore
  if (tab.url.includes("CampusAnswerDetail")) {
    chrome.pageAction.show(tabId);
  }
});
