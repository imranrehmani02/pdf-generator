
const donToPdf  = require('dom-to-pdf');
  generatePdf = () => {

    const element = document.querySelector('.summary-report-container');

    const options = {
      filename: "test.pdf",
    };

    return domToPdf(element, options, () => {
      // callback function
      console.log('Done');
    });
  }

  generatePdf()