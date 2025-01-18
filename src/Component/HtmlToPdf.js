import React, { useState } from "react";
import html2pdf from "html2pdf.js"; // Import html2pdf

const HtmlToPdf = ({ onDownload }) => {
  const [htmlContent, setHtmlContent] = useState("");
  const [downloadLink, setDownloadLink] = useState(null);

  const handleHtmlChange = (e) => {
    setHtmlContent(e.target.value);
  };

  const handleConvert = () => {
    if (htmlContent) {
      // Create a temporary element to hold the HTML content
      const element = document.createElement('div');
      element.innerHTML = htmlContent;

      // Convert HTML to PDF with embedded CSS
      html2pdf()
        .from(element)
        .set({
          margin: 10,
          filename: "html-to-pdf.pdf",
          html2canvas: { scale: 4 }, // Increase quality
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .toPdf()
        .get('pdf')
        .then((pdf) => {
          const pdfBlob = pdf.output('blob');
          const pdfUrl = URL.createObjectURL(pdfBlob);
          setDownloadLink(pdfUrl);  // Set the download link
        });
    }
  };

  const handlePreview = () => {
    if (downloadLink) {
      // Open the PDF in a new tab for preview
      window.open(downloadLink, '_blank');
    }
  };

  const handleDownload = () => {
    if (downloadLink) {
      // Trigger the download when the button is clicked
      const a = document.createElement('a');
      a.href = downloadLink;
      a.download = 'html-to-pdf.pdf'; // Specify the file name
      a.click(); // Trigger the download
    }
  };

  return (
    <div>
      {!downloadLink ? (
        <div>
          <textarea
            className="form-control"
            placeholder="Enter HTML content"
            value={htmlContent}
            onChange={handleHtmlChange}
            rows="6"
          />
          <button className="btn btn-primary mt-2" onClick={handleConvert}>
            Convert to PDF
          </button>
        </div>
      ) : (
        <div>
          <button className="btn btn-info mt-2" onClick={handlePreview}>
            Preview PDF
          </button>
          &nbsp;
          <button className="btn btn-success mt-2" onClick={handleDownload}>
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default HtmlToPdf;
