chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.endsWith('.pdf')) {
    chrome.tabs.sendMessage(tabId, { action: 'extractPdfText' });
  }
});
