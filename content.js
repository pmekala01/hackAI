(async () => {
  const pdfURL = window.location.href;
  const response = await fetch(pdfURL);
  const data = await response.arrayBuffer();
  const pdfData = new Uint8Array(data);

  const loadingTask = pdfjsLib.getDocument({ data: pdfData });
  const pdfDocument = await loadingTask.promise;

  let extractedText = '';

  for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber++) {
    const page = await pdfDocument.getPage(pageNumber);
    const textContent = await page.getTextContent();
    extractedText += textContent.items.map((item) => item.str).join(' ');
  }

  chrome.runtime.sendMessage({ extractedText: extractedText });
})();
