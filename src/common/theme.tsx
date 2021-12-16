import { extendTheme } from "@chakra-ui/react"

export const extendedGlobalTheme = extendTheme({
  styles: {
    global: {
      "html,body": {
        minHeight: "100vh",
        maxWidth: "100%",
        margin: 0,
        padding: 0
      },
      "#root": {
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column"
      }
    }
  }
})
