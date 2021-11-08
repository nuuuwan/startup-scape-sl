import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import HomePage from "./stateful/pages/HomePage.js";

import "./App.css";

const theme = createTheme({
  typography: {
    fontFamily: ["Lato", "sans-serif"].join(","),
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router basename="/startup-scape-sl">
        <Switch>
          <Route path="/:navigationCode" component={HomePage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
