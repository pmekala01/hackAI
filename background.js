chrome.action.onClicked.addListener(async (tab) => {
  const currentURL = tab.url;

  if (currentURL.toLowerCase().endsWith('.pdf')) {
    const response = await fetch(currentURL);
    const data = await response.arrayBuffer();
    const pdfData = new Uint8Array(data);
    const loadingTask = pdfjsLib.getDocument({ data: pdfData });
    const pdfDocument = await loadingTask.promise;

    let extractedText = '';

    for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber++) {
      const page = await pdfDocument.getPage(pageNumber);
      const textContent = await page.getTextContent();

      extractedText += textContent.items.map(item => item.str).join(' ');
    }

    console.log('Extracted text:', extractedText);

    // You can store or manipulate the extracted text here.
  } else {
    console.log('The current page is not a PDF file.');
  }
});
