import { QuestionInput } from "./components/QuestionInput";
import PDFViewer from "./components/PDFViewer/PDFViewer";
import FileUpload from "./components/FileUpload/FileUpload";
import PDFNavigator from "./components/PDFNavigator/PDFNavigator";
import PDFZoom from "./components/PDFZoom/PDFZoom";
import Answer from "./components/Answer/Answer";
import { Stack, IStackStyles, IStackTokens } from "@fluentui/react/lib/Stack";
import styles from "./App.module.css";

//Panel
import { DefaultButton } from "@fluentui/react/lib/Button";
import { Panel } from "@fluentui/react/lib/Panel";
import { useBoolean } from "@fluentui/react-hooks";

import { useState, useEffect } from "react";

import { assess } from "../api/api";

interface AnswerData {
  verdict: "";
  justification: "";
  rectified: "";
}

function App() {
  //To reset
  const emptyAnswer: AnswerData = {
    verdict: "",
    justification: "",
    rectified: "",
  };

  let [pageNumber, setpageNumber] = useState<number>(0);
  let [numPages, setNumPages] = useState<number>(0);
  const [pdfFile, setPDFFile] = useState<File | null>(null);
  let [zoom, setzoom] = useState<number>(1);
  const maxZoom: number = 10;
  let [questionReceived, setquestionReceived] = useState<string>("");
  // let [answer, setAnswer] = useState<string>("");

  //Panel
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);

  let [answer, setAnswer] = useState<AnswerData>({
    verdict: "",
    justification: "",
    rectified: "",
  });

  const handleFileUploadChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    //'e.target.files' is possibly 'null' error.
    if (!e.target.files) return;

    setPDFFile(e.target.files[0]);
    console.log(e.target.files);

    setpageNumber(1);
  };

  const handlePrevClick = (): void => {
    console.log("Prev clicked");

    if (pageNumber > 1) {
      setpageNumber(pageNumber - 1);
    }
  };

  const handleNextClick = (): void => {
    console.log("Next clicked");
    if (pageNumber < numPages) {
      setpageNumber(pageNumber + 1);
    }
  };

  //
  const handleonZoomMinusClick = (): void => {
    console.log("Zoom Minus clicked");

    if (zoom > 1) {
      setzoom(zoom - 1);
    }
  };

  const handleonZoomPlusClick = (): void => {
    console.log("Zoom Plus clicked");
    if (zoom < maxZoom) {
      setzoom(zoom + 1);
    }
  };

  const handleSetNumPages = (numPages: number): void => {
    setNumPages(numPages);
    console.log(numPages);
  };

  const handleOnSend = (Question: string): void => {
    // console.log(
    //   "handleOnSend = (Question: string): void => " + Question.toString()
    // );
    setAnswer(emptyAnswer);
    setquestionReceived(Question.toString()); //Used to pass to Answer component
    // console.log("question:" + questionReceived.toString());
    //State updates late / async, so using input parameter
    assess(Question.toString())
      .then((response) => response.json())
      .then((data) => {
        setAnswer(JSON.parse(data)); //Passing as JSON
        // console.log(data);
      });
  };

  const stackTokens: IStackTokens = {
    childrenGap: 10,
  };
  //

  return (
    <div>
      <span
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <h2 className={styles.AppTitle}>
          Azure OpenAI Demo - Policy Terms & Conditions Analysis
        </h2>
      </span>
      <Stack horizontal tokens={stackTokens} style={{ width: "100%" }}>
        <Stack.Item
          grow
          styles={{ root: { width: "60%", marginLeft: "30px" } }}
        >
          {/* <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginLeft: "20px",
            }}
          > */}
          <PDFViewer
            pdffile={pdfFile}
            pageNumber={pageNumber}
            scale={zoom}
            setNumPages={handleSetNumPages}
          />

          <Stack
            horizontal
            tokens={stackTokens}
            horizontalAlign="space-between"
            style={{ width: "100%" }}
          >
            <Stack.Item
              align="start"
              style={{ marginTop: "10px", marginLeft: "10px" }}
            >
              <PDFNavigator
                currentPageNumber={pageNumber}
                numPages={numPages}
                onPrevClick={handlePrevClick}
                onNextClick={handleNextClick}
              />
            </Stack.Item>
            <Stack.Item align="center" style={{ marginTop: "10px" }}>
              <FileUpload onChange={handleFileUploadChange} />
            </Stack.Item>
            <Stack.Item
              align="end"
              style={{ marginTop: "10px", marginRight: "10px" }}
            >
              <PDFZoom
                zoomLevel={zoom}
                numPages={numPages}
                onZoomMinusClick={handleonZoomMinusClick}
                onZoomPlusClick={handleonZoomPlusClick}
              />
            </Stack.Item>
          </Stack>
          {/* </div> */}
        </Stack.Item>

        <Stack.Item grow styles={{ root: { width: "40%" } }}>
          <Stack style={{ width: "90%" }}>
            <Stack.Item>
              <QuestionInput
                clearOnSend={true}
                placeholder="Enter the term / condition to validate..."
                disabled={false}
                onSend={(question, id) => handleOnSend(question)}
                conversationId={""}
                onPromptInfo={openPanel}
              />
            </Stack.Item>
            <Stack.Item>
              <Answer answer={answer} question={questionReceived} />
            </Stack.Item>
          </Stack>
        </Stack.Item>
      </Stack>
      <Panel
        headerText="LLM Prompt"
        isOpen={isOpen}
        onDismiss={dismissPanel}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
        closeButtonAriaLabel="Close"
      >
        <p>
          You are a legal compliance officer who is responsible to identify
          fairness of contract terms in provided contract. A standard form
          contract will typically be one prepared by one party to the contract
          and not negotiated between the parties. The Australian Consumer Law
          (ACL) and the Australian Securities and Investments Commission (ASIC)
          Act define ‘consumer contract’ as a contract for the supply of goods
          or services, or the sale or grant of an interest in land, to an
          individual for personal, domestic or household use or consumption. The
          unfair contract terms laws do not apply to standard form consumer
          contract terms that: 1) define the main subject matter (goods or
          services) of a consumer contract. 2) the upfront price payable under
          the contract provided it was disclosed before the contract was entered
          into. 3) are required, or expressly permitted, by a law of the
          Commonwealth or a state or territory. For example, a cooling-off
          period clause.
          <br />
          <br />
          Before you analyse the consumer contract terms and come back with
          unfair terms found (if any) along with why do you think the term is
          unfair, please take a note of below guidelines. In deciding whether a
          term in a standard form consumer contract is unfair, please apply the
          three–limbed test for unfairness. A term of a consumer contract is
          unfair if it: 1) would cause a significant imbalance in the parties’
          rights and obligations arising under the contract 2) is not reasonably
          necessary to protect the legitimate interests of the party who would
          be advantaged by the term; and 3) would cause detriment (whether
          financial or otherwise) to a party if it were to be applied or relied
          on. Here are some examples of the types of terms in a standard form
          consumer contract that may be unfair and fair. Example 1: Unfair
          contract term - Subject to any statutory rights which cannot be varied
          or exempted. You agree that the Operator shall not in any
          circumstances whatsoever be liable for any loss of or damage to your
          vehicle whether or not such loss or damage is caused by negligence or
          actions constituting fundamental breach of contract or the misdelivery
          of your vehicle to an unauthorised person or theft or vandalism or
          trickery and you further agree that if this exemption of liability
          does not apply then to the extent that you may lawfully do so you
          agree to limit the liability of the operator to pay you for the loss
          and damage to an amount not exceeding $300. Short explanation of why
          the term is unfair - The terms and conditions for a car parking site
          would be considered to be seeking to limit the company’s liability.
          Example 2: Unfair contract term - I agree that you shall not be liable
          for fire, loss or damage to the vehicle whilst under your control or
          the loss of my contents thereof, equipment radio, tolls etc. Short
          explanation of why the term is unfair - A review of a motor vehicle
          repairer’s contracts found a number of terms and conditions regarding
          limitation of liability which was considered too broad and would
          potentially leave the consumer out of pocket even if the repairer
          drove the vehicle negligently and damaged it...........
        </p>
      </Panel>
    </div>
  );
}

export default App;
