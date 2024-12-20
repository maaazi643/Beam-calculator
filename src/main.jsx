import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MathJaxContext } from "better-react-mathjax";
import { Toaster } from "react-hot-toast";

const theme = createTheme();

const config = {
  loader: { load: ["input/asciimath"] },
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MathJaxContext config={config}>
          <Toaster />
          <App />
        </MathJaxContext>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
