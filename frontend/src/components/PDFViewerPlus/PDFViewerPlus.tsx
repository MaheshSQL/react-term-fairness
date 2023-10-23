import { useState } from "react";
import { Document, Page } from "react-pdf";

import { pdfjs } from "react-pdf";
import styles from "./PDFViewer.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

function PDFViewerPlus() {
  const [pdfFile, setPDFFile] = useState<File | null>(null);

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(-1);

  const handleFileUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //'e.target.files' is possibly 'null' error.
    if (!e.target.files) return;

    setPDFFile(e.target.files[0]);
    // console.log(e.target.files[0]);
  };

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    console.log(numPages);
  }

  return (
    <div>
      <div className={styles.input_container}>
        <input
          id="fileUpload"
          type="file"
          accept=".pdf"
          onChange={handleFileUploadChange}
        />
      </div>
      <Document
        className={styles.viewer_container}
        file={pdfFile}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        <Page pageNumber={1} scale={1.5} />

        {/* {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => (
            <Page pageNumber={page} scale={1.5} key={"pdfpage" + page} />
          ))} */}
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </Document>
    </div>
  );
}

export default PDFViewerPlus;
