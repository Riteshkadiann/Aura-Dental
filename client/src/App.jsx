//import React from "react"; // Optional in React 17+ if using JSX transform
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MainRouter from "../MainRouter";
import theme from "../theme";

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {}
        <MainRouter />
      </ThemeProvider>
    </Router>
  );
};

export default App;
