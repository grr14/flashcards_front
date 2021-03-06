import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { ChakraProvider } from "@chakra-ui/react"
import { extendedGlobalTheme } from "./common/theme"
import { QueryClient, QueryClientProvider } from "react-query"

const client = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ChakraProvider theme={extendedGlobalTheme}>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
