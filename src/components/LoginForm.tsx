/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import React from "react"
import { useNavigate } from "react-router"
import { login } from "../auth"
import { User, Either, Session, LoginError } from "../common/types"

const LoginForm = () => {
  const [userInput, setUserInput] = React.useState<Partial<User>>({
    username: "",
    password: ""
  })

  let navigate = useNavigate()
  const [authError, setAuthError] = React.useState<boolean>(false)

  const onSubmitClick = async (e: React.SyntheticEvent) => {
    e.preventDefault()

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

export default LoginForm
