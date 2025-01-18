import React, { useState } from "react";
import { jsPDF } from "jspdf";

const ImageToPdf = ({ onDownload }) => {
  const [files, setFiles] = useState([]);
  const [downloadLink, setDownloadLink] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);

    // Validate file types
    const invalidFiles = uploadedFiles.filter(
      (file) => !file.type.startsWith("image/")
    );
    if (invalidFiles.length > 0) {
      setError("Please upload only valid image files (JPEG, PNG, etc.).");
      setFiles([]);
      return;
    }

    setFiles(uploadedFiles);
    setError(null);
  };

  const handleConvert = () => {
    if (files.length > 0) {
      const doc = new jsPDF();

      const processFiles = (index) => {
        if (index >= files.length) {
          // All files processed
          const pdfBlob = doc.output("blob");
          const pdfUrl = URL.createObjectURL(pdfBlob);
          setDownloadLink(pdfUrl);
          return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
          const imgData = reader.result;

          if (index > 0) {
            doc.addPage(); // Add a new page for each image after the first one
          }
          doc.addImage(imgData, "JPEG", 15, 20, 180, 160); // Adjust the position and size

          // Move to the next image
          processFiles(index + 1);
        };

        reader.readAsDataURL(files[index]);
      };

      processFiles(0);
    }
  };

  const resetState = () => {
    setFiles([]);
    setDownloadLink(null);
    setError(null);
  };

  return (
    <div>
      {!downloadLink ? (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="form-control mb-2"
            multiple // Enable multi-select
          />
          {error && <p className="text-danger">{error}</p>}
          <button
            className="btn btn-primary mt-2"
            onClick={handleConvert}
            disabled={files.length === 0}
          >
            Convert to PDF
          </button>
        </div>
      ) : (
        <div>
          <a href={downloadLink} download="images-to-pdf.pdf">
            <button
              className="btn btn-success mt-2"
              onClick={() => onDownload("images-to-pdf.pdf")}
            >
              Download PDF
            </button>
          </a>
          <a href={downloadLink} target="_blank" rel="noopener noreferrer">
            <button className="btn btn-info mt-2">Open PDF</button>
          </a>
          <button className="btn btn-secondary mt-2" onClick={resetState}>
            Convert More Images
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageToPdf;
