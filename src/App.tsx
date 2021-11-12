import React from "react"
import logo from "./logo.svg"
import "./App.css"

function App() {
  const isDev = process.env.NODE_ENV === "development"

  const [currentTime, setCurrentTime] = React.useState("")
  const [pede, setPede] = React.useState("")

  React.useEffect(() => {
    fetch("/api/time")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setCurrentTime(data.now)
      })
  }, [])

  React.useEffect(() => {
    fetch(`/greet/${pede}`)
      .then((res) => res.json())
      .then((data) => {
        setPede(data.greeting)
      })
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPede(event.target.value)
  }

  const handleSubmit = () => {}

  return (
    <div className="App">
      <h2>back end = {process.env.REACT_APP_FLASK_BACKEND_URL}</h2>
      <h3>is dev = {process.env.NODE_ENV == "development" ? "dev" : "prod"}</h3>
      <p>
        The current time is {currentTime === "" ? "nik c mor" : currentTime}
      </p>
      <form>
        <label>
          Nom :
          <input type="text" name="pede" value={pede} onChange={handleChange} />
        </label>
        <input type="submit" value="Envoyer" />
      </form>
      <p>{pede}</p>
    </div>
  )
}

export default App
