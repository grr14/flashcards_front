import { Global, css } from "@emotion/react"

const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        html {
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
        }
        *,
        *:before,
        *:after {
          -webkit-box-sizing: inherit;
          -moz-box-sizing: inherit;
          box-sizing: inherit;
        }
        body {
          margin: 0;
          min-height: 100vh;
          max-width: 100%;
          margin: 0;
          padding: 0;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
          text-rendering: optimizeLegibility;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-y: scroll;
        }

        code {
          font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
            monospace;
        }

        #root {
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
        }
      `}
    />
  )
}

export default GlobalStyles
