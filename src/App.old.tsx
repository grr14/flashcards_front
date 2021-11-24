import React from "react"
import "./App.css"

function App() {
  const novak = {
    id: null,
    username: null,
    email: null,
    password: null,
    is_active: null,
    date_joined: null,
    last_login: null
  }

  const [currentTime, setCurrentTime] = React.useState("")
  const [name, setName] = React.useState("")
  const [user, setUser] = React.useState(novak)

  React.useEffect(() => {
    fetch(`/api/time`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setCurrentTime(data.now)
      })
  }, [])

  React.useEffect(() => {
    fetch(`/api/greet/${name}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setUser(data)
      })
  }, [])

  const fetchUser = async function () {
    const res = await fetch(`/api/greet/${name}`)
    const body = await res.json()
    console.log(JSON.stringify(body))
    setUser(body)
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    fetchUser()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setName(event.target.value)
  }

  return (
    <div className="App">
      <h2>back end = {process.env.REACT_APP_FLASK_BACKEND_URL_PROD}</h2>
      <h3>node env = {process.env.NODE_ENV}</h3>
      <p>
        The current time is {currentTime === "" ? "nik c mor" : currentTime}
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          Nom :
          <input type="text" name="name" value={name} onChange={handleChange} />
        </label>
        <input type="submit" value="Envoyer" />
      </form>
      <p>in the form: {name}</p>
      <p>user is :{JSON.stringify(user)}</p>
    </div>
  )
}

export default App
