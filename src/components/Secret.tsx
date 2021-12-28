import React from "react"
import { authFetch } from "../auth"
import HttpStatusCode from "../constants/httpStatusCode"

const Secret = () => {
  const [message, setMessage] = React.useState("")

  React.useEffect(() => {
    authFetch("/api/protected")
      .then((response) => {
        if (response.status === HttpStatusCode.UNAUTHORIZED) {
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

export default Secret
