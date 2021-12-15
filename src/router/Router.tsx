import * as routes from "../constants/routes"
import { Routes, Route } from "react-router-dom"
import Home from "../components/Home"
import NeedLogin from "../components/NeedLogin"
import Secret from "../components/Secret"
import VerifyEmail from "../components/VerifyEmail"
import RequireAuth from "./AuthRoute"

const Router = ({ isLogged }: { isLogged: boolean }) => {
  return (
    <Routes>
      <Route path={routes.HOME} element={<Home />} />
      <Route
        path={routes.SECRET}
        element={
          <RequireAuth isLogged={isLogged}>
            <Secret />
          </RequireAuth>
        }
      ></Route>
      <Route path={routes.LOGIN} element={<NeedLogin />} />
      <Route path={routes.VERIFY_EMAIL} element={<VerifyEmail />} />
    </Routes>
  )
}

export default Router
