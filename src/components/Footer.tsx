/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react"

const Footer = () => {
  return (
    <footer
      css={css`
        width: 100%;
        padding: 10px 0 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.75em;
      `}
    >
      flashcards GRR
    </footer>
  )
}

export default Footer
