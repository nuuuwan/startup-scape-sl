import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import HomePage, {
  getDefaultNavigationCode,
} from "./stateful/pages/HomePage.js";

import "./App.css";

const theme = createTheme({
  typography: {
    fontFamily: ["Lato", "sans-serif"].join(","),
  },
});
function App() {
  const defaultNavigationCode = getDefaultNavigationCode();
  return (
    <ThemeProvider theme={theme}>
      <Router basename="/startup-scape-sl">
        <Switch>
          <Route path="/:navigationCode" component={HomePage} />
          <Route>
            <Redirect to={`/${defaultNavigationCode}`} />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
