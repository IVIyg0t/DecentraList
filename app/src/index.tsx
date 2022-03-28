import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DAppProvider } from "@usedapp/core";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
});

const config = {
  // readOnlyChainId: ChainId.CronosTestnet,
  readOnlyChainId: 1337,
  readOnlyUrls: {
    "1337": "http://127.0.0.1:7545",
    // [ChainId.CronosTestnet]: "https://evm-t3.cronos.org/",
  },
};

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
