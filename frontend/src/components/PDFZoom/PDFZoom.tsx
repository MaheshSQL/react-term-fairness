import { Stack } from "@fluentui/react";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { TextField, ITextFieldStyles } from "@fluentui/react/lib/TextField";
import { Label } from "@fluentui/react/lib/Label";
import styles from "./PDFZoom.module.css";

import * as ReactIcons from "@fluentui/react-icons-mdl2";
// import { initializeIcons } from "@fluentui/font-icons-mdl2";
// initializeIcons();

const narrowTextFieldStyles: Partial<ITextFieldStyles> = {
  fieldGroup: {
    width: 50,
    borderWidth: "1px",
    borderColor: "#fff",
  },
};

interface Props {
  zoomLevel: number;
  numPages: number;
  onZoomPlusClick: () => void;
  onZoomMinusClick: () => void;
}

function PDFZoom({
  zoomLevel,
  numPages,
  onZoomPlusClick,
  onZoomMinusClick,
}: Props) {
  if (numPages > 0) {
    return (
      <div>
        <Stack horizontal className={styles.zoom_parent}>
          <ReactIcons.ZoomOutIcon
            onClick={onZoomMinusClick}
            style={{ height: "25px", marginRight: "15px" }}
          />

          <Label className={styles.zoom_label}>
            {zoomLevel.toString() + "x"}
          </Label>

          <ReactIcons.ZoomInIcon
            onClick={onZoomPlusClick}
            style={{ height: "25px", marginLeft: "10px" }}
          />
        </Stack>
      </div>
    );
  }
  //else
  return <div></div>;
}

export default PDFZoom;
