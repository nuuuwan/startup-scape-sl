import "./App.css";

import HomePage from "./stateful/pages/HomePage.js";

import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
  typography: {
    fontFamily: [
      'Lato',
    ].join(','),
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
