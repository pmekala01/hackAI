function injectScript(file, callback) {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL(file);
  script.onload = callback;
  document.head.appendChild(script);
}

async function extractPdfText() {
  const currentURL = window.location.href;

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
  } else {
    console.log('The current page is not a PDF file.');
  }
}

injectScript('pdfjs-dist/build/pdf.min.js', () => {
  extractPdfText();

  // Observe URL changes and re-run the extraction when a PDF is opened
  const observer = new MutationObserver(extractPdfText);
  observer.observe(document, { childList: true, subtree: true });
});
