import { Navigate, useLocation } from "react-router-dom"

const RequireAuth = ({
  children,
  isLogged
}: {
  children: JSX.Element
  isLogged: Boolean
}) => {
  let location = useLocation()

  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return children
}

export default RequireAuth
