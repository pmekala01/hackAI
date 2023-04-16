chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Extracted text:', request.extractedText);
});
