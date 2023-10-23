import { Stack } from "@fluentui/react";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { TextField, ITextFieldStyles } from "@fluentui/react/lib/TextField";
import { Label } from "@fluentui/react/lib/Label";
import styles from "./PDFNavigator.module.css";

const narrowTextFieldStyles: Partial<ITextFieldStyles> = {
  fieldGroup: { width: 100, borderWidth: "1px", borderColor: "#e5e5e5" },
};

interface Props {
  currentPageNumber: number;
  numPages: number;
  onPrevClick: () => void;
  onNextClick: () => void;
}

function PDFNavigator({
  currentPageNumber,
  numPages,
  onPrevClick,
  onNextClick,
}: Props) {
  if (numPages > 0) {
    return (
      <div>
        <Stack horizontal>
          <PrimaryButton
            text="Prev"
            onClick={onPrevClick}
            style={{ backgroundColor: "#fff", color: "black" }}
          />
          {/* <TextField
          readOnly={true}
          value={currentPageNumber.toString() + " of " + numPages.toString()}
          styles={narrowTextFieldStyles}
        /> */}
          <Label className={styles.label}>
            {currentPageNumber.toString() + " of " + numPages.toString()}
          </Label>
          <PrimaryButton
            text="Next"
            onClick={onNextClick}
            style={{ backgroundColor: "#fff", color: "black" }}
          />
        </Stack>
      </div>
    );
  }
  //else
  return <div></div>;
}

export default PDFNavigator;
