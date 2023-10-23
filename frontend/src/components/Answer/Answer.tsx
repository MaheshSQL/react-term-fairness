import { Stack } from "@fluentui/react";
import styles from "./Answer.module.css";

//Spinner
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import { Label } from "@fluentui/react/lib/Label";
import { IStackProps } from "@fluentui/react/lib/Stack";

interface AnswerData {
  verdict: "";
  justification: "";
  rectified: "";
}

interface Props {
  question: string;
  answer: AnswerData;
}

function Answer({ answer, question }: Props) {
  //Spinner
  // This is just for laying out the label and spinner (spinners don't have to be inside a Stack)
  const rowProps: IStackProps = { horizontal: true, verticalAlign: "center" };

  const tokens = {
    sectionStack: {
      childrenGap: 10,
    },
    spinnerStack: {
      childrenGap: 20,
    },
  };

  //
  if (question) {
    return (
      <Stack>
        <div className={styles.answer_container}>
          <div className={styles.answer_area}>
            <span style={{ fontWeight: "bold" }}>{question && "Term:"} </span>{" "}
            <span>{question}</span>
            <br />
            <br />
            {answer.verdict === "" ? (
              <Spinner size={SpinnerSize.large} />
            ) : null}
            <span style={{ fontWeight: "bold" }}>
              {answer?.verdict && "Observation:"}{" "}
            </span>{" "}
            <span>{answer?.verdict?.toString().toUpperCase()}</span>
            <br />
            <br />
            <span style={{ fontWeight: "bold" }}>
              {answer?.justification && "Rationale:"}{" "}
            </span>{" "}
            <span>{answer?.justification?.toString()}</span>
            <br />
            <br />
            <span
              style={{
                fontWeight: "bold",
                textDecoration: "underline",
                color: "brown",
              }}
            >
              {answer?.rectified && "Potential correction:"}
            </span>{" "}
            <span>{answer?.rectified?.toString()}</span>
          </div>
        </div>
        {/* <div className={styles.answer_containerBottomBorder} /> */}
      </Stack>
    );
  }
  //else
  return <div></div>;
}

export default Answer;
