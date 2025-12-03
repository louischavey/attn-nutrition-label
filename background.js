function setPopupForTab(tabId, url) {
  if (!url) return;
  const isInstagram = /(^|\.)instagram\.com\//.test(url);
  chrome.action.setPopup({
    tabId,
    popup: isInstagram ? 'popup/popup_instagram.html' : 'popup/popup.html'
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    setPopupForTab(tabId, tab.url);
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    setPopupForTab(activeInfo.tabId, tab.url);
  } catch (e) {
    // ignore
  }
});

chrome.runtime.onInstalled.addListener(async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) setPopupForTab(tab.id, tab.url);
  } catch (e) {
    // ignore
  }
});