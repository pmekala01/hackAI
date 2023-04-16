# hackAI
resAI Chrome Extension

resAI is a Chrome extension that automatically extracts text from PDFs opened in the browser, generates a job title using OpenAI's ChatGPT API, and searches for job listings on LinkedIn based on the job title. The extension then displays the job listings within the Chrome extension interface.
Features

    Automatically detects and extracts text from PDFs opened in Chrome
    Generates a job title based on the extracted text using OpenAI's ChatGPT API
    Searches for job listings on LinkedIn using the generated job title
    Displays job listings within the Chrome extension interface

Installation

    Download or clone this repository to your local machine.
    Open Chrome and navigate to chrome://extensions/.
    Enable "Developer mode" using the toggle in the top right corner.
    Click "Load unpacked" and select the directory containing the resAI extension files.
    The resAI extension should now be installed and visible in your extensions list.

Usage

    Open a PDF in Google Chrome.
    The extension will automatically extract the text and generate a job title using OpenAI's ChatGPT API.
    The extension will search for job listings on LinkedIn based on the generated job title.
    The job listings will be displayed within the extension's interface.
    Click on a job listing to view more details or apply for the job.

Files

    manifest.json: The manifest file for the Chrome extension, containing metadata and configuration.
    content_script.js: The JavaScript file responsible for detecting and extracting text from PDFs.
    background_script.js: The JavaScript file responsible for handling API requests and communication with the extension's interface.
    popup.html: The HTML file for the extension's interface, displaying the job listings.
    popup.js: The JavaScript file responsible for managing the extension's interface and rendering job listings.
    style.css: The CSS file for styling the extension's interface.

Dependencies

    pdf.js: A library for parsing and rendering PDFs in the browser.
    OpenAI's ChatGPT API: The API for generating job titles using ChatGPT.
    LinkedIn API: The API for searching and displaying job listings on LinkedIn.

License

This project is licensed under the MIT License.
Support

If you encounter any issues or have any questions, please open an issue on the GitHub repository.
Contributing

We welcome contributions to improve the extension. Please submit a pull request or open an issue to discuss any proposed changes or additions.
