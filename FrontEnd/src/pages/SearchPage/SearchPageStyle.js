import { makeStyles } from "@mui/styles";
import theme from "../../Utilities/Theme";
const useStyle = makeStyles({
  page: {
    marginTop: "3rem",
    maxWidth: "75rem",
    margin: "3rem auto 1rem",
    [theme.breakpoints.only("sm")]: {
      maxWidth: "45rem",
    },
  },
  paper: {
    width: "100%",
    padding: "1rem",
  },
});

export default useStyle;
