import { useState } from "react";
import { Stack, TextField } from "@fluentui/react";
import { SendRegular } from "@fluentui/react-icons";
import Send from "../../assets/Send.svg";
import styles from "./QuestionInput.module.css";
import * as ReactIcons from "@fluentui/react-icons-mdl2";

interface Props {
  onSend: (question: string, id?: string) => void;
  disabled: boolean;
  placeholder?: string;
  clearOnSend?: boolean;
  conversationId?: string;
  onPromptInfo: () => void;
}

export const QuestionInput = ({
  onSend,
  disabled,
  placeholder,
  clearOnSend,
  conversationId,
  onPromptInfo,
}: Props) => {
  const [question, setQuestion] = useState<string>("");

  const sendQuestion = () => {
    // console.log("sendQuestion = () => " + question.toString());

    if (disabled || !question.trim()) {
      return;
    }

    if (conversationId) {
      onSend(question, conversationId);
    } else {
      onSend(question);
    }

    if (clearOnSend) {
      setQuestion("");
    }
  };

  const onEnterPress = (ev: React.KeyboardEvent<Element>) => {
    if (ev.key === "Enter" && !ev.shiftKey) {
      ev.preventDefault();
      sendQuestion();
    }
  };

  const onQuestionChange = (
    _ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    setQuestion(newValue || "");
  };

  const sendQuestionDisabled = disabled || !question.trim();

  return (
    <Stack horizontal className={styles.questionInputContainer}>
      <TextField
        styles={{ field: { height: "160px" } }}
        className={styles.questionInputTextArea}
        placeholder={placeholder}
        multiline
        resizable={false}
        borderless
        value={question}
        onChange={onQuestionChange}
        onKeyDown={onEnterPress}
      />
      <div
        className={styles.questionInputSendButtonContainer}
        role="button"
        tabIndex={0}
        aria-label="Ask question button"
        onClick={sendQuestion}
        onKeyDown={(e) =>
          e.key === "Enter" || e.key === " " ? sendQuestion() : null
        }
      >
        {sendQuestionDisabled ? (
          <SendRegular className={styles.questionInputSendButtonDisabled} />
        ) : (
          <div>
            <img src={Send} className={styles.questionInputSendButton} />
          </div>
        )}
      </div>
      <div
        className={styles.viewPromptButtonContainer}
        role="button"
        tabIndex={0}
        aria-label="View Prompt button"
        onClick={onPromptInfo}
        onKeyDown={(e) =>
          e.key === "Enter" || e.key === " " ? onPromptInfo() : null
        }
      >
        <ReactIcons.InfoIcon style={{ height: "20px", marginRight: "15px" }} />
      </div>

      <div className={styles.questionInputBottomBorder} />
    </Stack>
  );
};

export default QuestionInput;
