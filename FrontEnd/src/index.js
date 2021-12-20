import ReactDOM from "react-dom";
import { ThemeProvider } from "@mui/material/styles";
import "./Utilities/normalize.css";
import App from "./App";
import theme from "./Utilities/Theme";
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
