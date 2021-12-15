/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import React from "react"

import { BrowserRouter, Link } from "react-router-dom"
import { useAuth, logout } from "./auth"

import Footer from "./components/Footer"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"
import Router from "./router/Router"

const App = () => {
  const [isLogged] = useAuth()
  return (
    <BrowserRouter>
      <div
        css={css`
          background-color: #b5b5b5;
          flex: 1;
          display: flex;
          flex-direction: column;
          color: #323232;
          font-family: sans-serif;
        `}
      >
        <header
          css={css`
            display: flex;
            padding: 0 5px;
            width: 100%;
          `}
        >
          <nav
            css={css`
              width: 100%;
            `}
          >
            <ul
              css={css`
                display: flex;
                justify-content: space-evenly;
                align-items: center;
              `}
            >
              <li
                css={css`
                  flex: 1;
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                `}
              >
                <Link to="/">Home</Link>
              </li>
              <li
                css={css`
                  flex: 1;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                `}
              >
                <Link to="/secret">Secret</Link>
              </li>
              {!isLogged ? (
                <React.Fragment>
                  <li
                    css={css`
                      flex: 1;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    `}
                  >
                    <LoginForm />
                  </li>
                  <li
                    css={css`
                      flex: 1;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    `}
                  >
                    <RegisterForm />
                  </li>
                </React.Fragment>
              ) : (
                <li
                  css={css`
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                  `}
                >
                  <p
                    css={css`
                      margin: 0;
                    `}
                  >
                    Hello, user
                  </p>
                  <button onClick={() => logout()}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        </header>

        <div
          css={css`
            background-color: pink;
            flex: 1;
          `}
        >
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Router isLogged={isLogged} />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
