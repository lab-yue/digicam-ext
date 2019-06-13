// @ts-ignore
chrome.tabs.onUpdated.addListener((tabId, _, tab) => {
  if (
    // @ts-ignore
    tab.url.includes("CampusAnswerDetail") ||
    // @ts-ignore
    tab.url.startsWith("https://campus.dhw.ac.jp/")
  ) {
    chrome.pageAction.show(tabId);
  }
});
