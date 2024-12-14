import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MathJaxContext } from "better-react-mathjax";

const theme = createTheme(); // Create a default theme

const config = {
  loader: { load: ["input/asciimath"] },
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MathJaxContext config={config}>
          <App />
        </MathJaxContext>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
