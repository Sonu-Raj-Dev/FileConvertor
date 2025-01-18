import React, { useState } from "react";
import ImageToPdf from "./Component/ImageToPdf";
import ImageToText from "./Component/ImageToText";
import HtmlToPdf from "./Component/HtmlToPdf";
//import PdfToWord from "./Component/PDFToWord";
import { Modal, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is loaded
import "./App.css"; // Adjust the path as necessary


function App() {
  const [activeConverter, setActiveConverter] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (converterKey) => {
    setActiveConverter(converterKey); // Set the active converter
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    setActiveConverter(null); // Reset the active converter
  };

  const renderActiveConverter = () => {
    if (activeConverter === "imageToPdf") {
      return <ImageToPdf onDownload={() => console.log("Downloading PDF")} />;
    } else if (activeConverter === "imageToText") {
      return <ImageToText onDownload={() => console.log("Downloading Text")} />;
    } 
    // else if (activeConverter === "pdfToWord") {
    //   return <PdfToWord onDownload={() => console.log("Downloading Word")} />;
    // }
     else if (activeConverter === "htmlToPdf") {
      return <HtmlToPdf onDownload={() => console.log("Downloading PDF")} />;
    } else {
      return null;
    }
  };
  
  return (
    <div className="container" style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1
        className="text-center mb-4 text-primary"
        style={{
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
          marginBottom: "18px",
        }}
      >
        File Conversion App
      </h1>

      <div className="row justify-content-center">
        {[
          { name: "Image to PDF", key: "imageToPdf" },
          { name: "Image to Text", key: "imageToText" },
          { name: "PDF to Word", key: "pdfToWord" },
          { name: "HTML to PDF", key: "htmlToPdf" },
        ].map((converter) => (
          <div
            className="col-xl-3 col-lg-3 col-md-6 col-sm-12 mt-3 d-flex justify-content-center"
            key={converter.key}
          >
            <Card
              className="d-flex align-items-center justify-content-center"
              style={{
                height: "250px",
                width: "250px",
                cursor: "pointer",
                borderRadius: "15px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onClick={() => handleCardClick(converter.key)}
            >
              <Card.Body className="d-flex flex-column align-items-center justify-content-center text-center">
                <h3>{converter.name}</h3>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {activeConverter && activeConverter.replace(/([A-Z])/g, " $1").trim()}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderActiveConverter()}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
