import React, { useState } from "react";
import Tesseract from "tesseract.js";

const ImageToText = ({ onDownload }) => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleConvert = () => {
    if (file) {
      Tesseract.recognize(file, "eng", { logger: (m) => console.log(m) })
        .then(({ data: { text } }) => {
          setText(text);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div>
      {!text ? (
        <div>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button className="btn btn-primary mt-2" onClick={handleConvert}>
            Convert to Text
          </button>
        </div>
      ) : (
        <div>
          <textarea className="form-control" value={text} rows="6" readOnly />
          <button
            className="btn btn-success mt-2"
            onClick={() => onDownload("image-to-text.txt")}
          >
            Download Text
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageToText;
