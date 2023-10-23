import styles from "./FileUpload.module.css";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FileUpload({ onChange }: Props) {
  return (
    <div className={styles.input_container}>
      <input id="fileUpload" type="file" accept=".pdf" onChange={onChange} />
    </div>
  );
}

export default FileUpload;
