import { useState } from "react";
import { Document, Page } from "react-pdf";

import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import styles from "./PDFViewer.module.css";

interface Props {
  pdffile: File | null;
  pageNumber: number;
  scale: number;
  setNumPages: (numPages: number) => void;
}

function PDFViewer({ pdffile, pageNumber, scale, setNumPages }: Props) {
  const handleOnPageLoadSuccess = (page: Page): void => {
    //To get the PDF content
    console.log(page.getTextContent());
  };

  return (
    <div style={{ height: "800px", width: "100%", overflow: "scroll" }}>
      <Document
        className={styles.viewer_container}
        file={pdffile}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        <Page
          pageNumber={pageNumber}
          scale={scale}
          onLoadSuccess={handleOnPageLoadSuccess}
        />
      </Document>
    </div>
  );
}

export default PDFViewer;
