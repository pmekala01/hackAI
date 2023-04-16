async function loadPDFJS() {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('pdfjs-dist/build/pdf.min.js');
    script.onload = () => {
      const workerScript = document.createElement('script');
      workerScript.src = chrome.runtime.getURL('pdfjs-dist/build/pdf.worker.min.js');
      workerScript.onload = resolve;
      document.head.appendChild(workerScript);
    };
    document.head.appendChild(script);
  });
}

async function extractPDFText(url) {
  const response = await fetch(url);
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
}

chrome.action.onClicked.addListener(async (tab) => {
  const currentURL = tab.url;

  if (currentURL.toLowerCase().endsWith('.pdf')) {
    // Load PDF.js library
    await loadPDFJS();
    // Extract text from the PDF
    await extractPDFText(currentURL);
  } else {
    console.log('The current page is not a PDF file.');
  }
});
