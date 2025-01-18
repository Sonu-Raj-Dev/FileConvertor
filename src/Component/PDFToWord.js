// import React, { useState } from "react";

// const PdfToWord = () => {
//   const [pdfText, setPdfText] = useState("");
//   const [file, setFile] = useState(null);
//   const [pdfjsLib, setPdfjsLib] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const extractTextFromPdf = (file) => {
//     if (!file || !pdfjsLib) return;

//     const fileReader = new FileReader();
//     fileReader.onload = async () => {
//       const typedArray = new Uint8Array(fileReader.result);

//       try {
//         const pdf = await pdfjsLib.getDocument(typedArray).promise;
//         const numPages = pdf.numPages;
//         let text = "";

//         // Loop through all pages and extract text
//         for (let pageNum = 1; pageNum <= numPages; pageNum++) {
//           const page = await pdf.getPage(pageNum);
//           const content = await page.getTextContent();
//           const pageText = content.items.map(item => item.str).join(" ");
//           text += pageText + "\n\n";
//         }

//         setPdfText(text); // Update the state with the extracted text
//       } catch (error) {
//         console.error("Error extracting PDF text:", error);
//       }
//     };
//     fileReader.readAsArrayBuffer(file);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     extractTextFromPdf(file);
//   };

//   // Dynamically load pdfjs-dist
//   if (!pdfjsLib) {
//     import('pdfjs-dist/legacy/build/pdf').then((module) => {
//       setPdfjsLib(module);
//     });
//   }

//   return (
//     <div>
//       <h1>PDF Text Extractor</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="file" accept="application/pdf" onChange={handleFileChange} />
//         <button type="submit">Extract Text</button>
//       </form>
//       {pdfText && (
//         <div>
//           <h2>Extracted Text</h2>
//           <pre>{pdfText}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PdfToWord;
