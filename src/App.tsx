/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react"

import React, { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

export default function App() {
  return (
    <Router>
      <div
        css={css`
          min-height: 100vh;
          max-width: 100%;
          margin: 0;
          padding: 0;
          background-color: #b5b5b5;
          display: flex;
          flex-direction: column;
          color: #323232;
        `}
      >
        <header
          css={css`
            display: flex;
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
                width: 50%;
              `}
            >
              <li
                css={css`
                  flex: 1;
                `}
              >
                <Link to="/">Home</Link>
              </li>
              <li
                css={css`
                  flex: 1;
                `}
              >
                <Link to="/login">Login</Link>
              </li>
              <li
                css={css`
                  flex: 1;
                `}
              >
                <Link to="/secret">Secret</Link>
              </li>
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
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>

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
      </div>
    </Router>
  )
}

function Home() {
  return <h2>Home</h2>
}

function Login() {
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")

  const onSubmitClick = (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log("You pressed login")
    let opts = {
      username: username,
      password: password,
    }
    console.log(opts)
    fetch(`/api/login`, {
      method: "post",
      body: JSON.stringify(opts),
    })
      .then((r) => r.json())
      .then((token) => {
        console.log("token=" + JSON.stringify(token))
        if (token.access_token) {
          console.log("succes")
        } else {
          console.log("Please type in correct username/password")
        }
      })
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <div>
      <h2>Login</h2>
      <form action="#">
        <div>
          <input
            type="text"
            placeholder="Username"
            onChange={handleUsernameChange}
            value={username}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            value={password}
          />
        </div>
        <button onClick={onSubmitClick} type="submit">
          Login Now
        </button>
      </form>
    </div>
  )
}
