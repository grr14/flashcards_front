import { Navigate, useLocation } from "react-router-dom"
import { LOGIN } from "../constants/routes"

const RequireAuth = ({
  children,
  isLogged
}: {
  children: JSX.Element
  isLogged: Boolean
}) => {
  let location = useLocation()

  if (!isLogged) {
    return <Navigate to={LOGIN} state={{ from: location }} />
  }

  return children
}

export default RequireAuth
