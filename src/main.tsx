import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const theme = extendTheme({
  colors: {
    appBackground: "#242629",
    headline: "#fffffe",
    paragraph: "#94a1b2",
    button: "#7f5af0",
    secondary: "#72757e",
    tertiary: "#2cb67d",
    cardBackground: "#16161a",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
