chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    const instagramConditions = [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'www.instagram.com' }
      }),
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'instagram.com' }
      })
    ];

    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: instagramConditions,
        actions: [ new chrome.declarativeContent.ShowAction() ]
      }
    ]);
  });
});