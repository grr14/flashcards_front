/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react"

import React, { useEffect } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
  useNavigate
} from "react-router-dom"
import { login, useAuth, logout, authFetch } from "./auth"
import { Either, LoginError, Session, User } from "./common/types"

const RequireAuth = ({
  children,
  isLogged
}: {
  children: JSX.Element
  isLogged: Boolean
}) => {
  let location = useLocation()

  console.log("isLogged ? " + isLogged.toString())

  if (!isLogged) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />
  }

  return children
}

const App = () => {
  const [isLogged] = useAuth()
  return (
    <Router>
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
                <li
                  css={css`
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  `}
                >
                  <Login />
                </li>
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="secret"
              element={
                <RequireAuth isLogged={isLogged}>
                  <Secret />
                </RequireAuth>
              }
            ></Route>
            <Route path="/login" element={<NeedLogin />} />
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

function NeedLogin() {
  return <h2>Please login to access this page.</h2>
}

function Login() {
  const [userInput, setUserInput] = React.useState<Partial<User>>({
    username: "",
    password: ""
  })

  let navigate = useNavigate()
  const [authError, setAuthError] = React.useState<boolean>(false)

  const onSubmitClick = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log("You pressed login")

    console.log(userInput)
    const response = await fetch(`/api/login`, {
      method: "post",
      body: JSON.stringify(userInput)
    })

    const data: Either<Session, LoginError> = await response.json()
    if (response.ok) {
      setAuthError(false)
      if (data.access_token) {
        login(data)
        navigate("/Secret")
      } else {
        console.log("error")
      }
    } else {
      setAuthError(true)
      console.log(`error = ${JSON.stringify(data)}`)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value })
  }

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <form
        action="#"
        css={css`
          display: flex;
        `}
      >
        <div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            value={userInput.username}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={userInput.password}
          />
        </div>
        <button onClick={onSubmitClick} type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

function Secret() {
  const [message, setMessage] = React.useState("")

  useEffect(() => {
    authFetch("/api/protected")
      .then((response) => {
        if (response.status === 401) {
          setMessage("Sorry you aren't authorized!")
          return
        }
        return response.json()
      })
      .then((response) => {
        if (response && response.message) {
          setMessage(response.message)
        }
      })
  }, [])
  return <h2>Secret: {message}</h2>
}

export default App
