// @ts-ignore
chrome.tabs.onUpdated.addListener((tabId, _, tab) => {
  if (
    // @ts-ignore
    tab.url.includes("CampusAnswerDetail") ||
    // @ts-ignore
    tab.url.startsWith("https://campus.dhw.ac.jp/")
  ) {
    chrome.pageAction.show(tabId);
    return;
  }
});

chrome.tabs.onUpdated.addListener((_, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    if (tab.url === "https://dh.force.com/digitalCampus/Campuslogin") {
      console.log("auto login 😎");
      chrome.tabs.executeScript({ file: "login-inject.js" });
    }
  }
});
