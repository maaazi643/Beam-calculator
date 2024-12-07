import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme(); // Create a default theme

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
