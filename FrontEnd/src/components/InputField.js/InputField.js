import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  input: {
    border: "none",
    backgroundColor: "#F7F7F9",
    padding: ".8rem 1.3rem",
    "&:not(:last-child)": {
      marginBottom: "1.5rem",
    },
    borderBottom: "2px solid #bdbdbd",
    "&:focus": {
      outline: "none",
    },
  },
  text: {
    color: "#888",
    marginBottom: ".5rem",
  },
  error: {
    borderColor: "#FF4848",
  },
});
function InputFieldSimple({
  onChange,
  placeholder,
  type = "text",
  error = false,
  disable = false,
  value = undefined,
  label,
}) {
  const ClassName = useStyle();
  return (
    <>
      <div className={ClassName.text}>{label}</div>
      <input
        disabled={disable}
        type={type}
        value={value}
        placeholder={placeholder}
        className={
          error ? `${ClassName.input} ${ClassName.error}` : ClassName.input
        }
        onChange={onChange}
      ></input>
    </>
  );
}

export default InputFieldSimple;
