
//parseOpenPDF
async function parseOpenPDF() {
  const currentURL = window.location.href;

  if (currentURL.toLowerCase().endsWith('.pdf')) {
    const pdfData = await fetchPDFData(currentURL);
    const pdfText = await parsePDFText(pdfData);
    console.log('Extracted text:', pdfText);
  } else {
    console.log('The current page is not a PDF file.');
  }
}

//fetchPDFData
async function fetchPDFData(url) {
  try {
    const response = await fetch(url);
    const data = await response.arrayBuffer();
    return new Uint8Array(data);
  } catch (error) {
    console.error('Error fetching PDF data:', error);
  }
}

//parsePDFText
async function parsePDFText(pdfData) {
  try {
    const loadingTask = pdfjsLib.getDocument({ data: pdfData });
    const pdfDocument = await loadingTask.promise;

    let extractedText = '';

    for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber++) {
      const page = await pdfDocument.getPage(pageNumber);
      const textContent = await page.getTextContent();

      extractedText += textContent.items.map(item => item.str).join(' ');
    }

    return extractedText;
  } catch (error) {
    console.error('Error parsing PDF text:', error);
  }
}
