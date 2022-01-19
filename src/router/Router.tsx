import * as routes from "../constants/routes"
import { Routes, Route } from "react-router-dom"
import Home from "../components/Home"
import NeedLogin from "../components/NeedLogin"
import Secret from "../components/Secret"
import VerifyEmail from "../components/VerifyEmail"
import RequireAuth from "./AuthRoute"
import Profile from "../components/Profile"
import { User } from "../common/types"
import { Settings, AccountDeleted } from "../components/Settings"
import Deck from "../components/Deck"
import NotFound from "../components/NotFound"

const Router = ({
  isLogged,
  user
}: {
  isLogged: boolean
  user: User | undefined
}) => {
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
      <Route
        path={routes.PROFILE}
        element={
          <RequireAuth isLogged={user !== undefined}>
            <Profile />
          </RequireAuth>
        }
      ></Route>
      <Route
        path={routes.SETTINGS}
        element={
          <RequireAuth isLogged={user !== undefined}>
            <Settings />
          </RequireAuth>
        }
      ></Route>
      <Route path={routes.LOGIN} element={<NeedLogin />} />
      <Route path={routes.VERIFY_EMAIL} element={<VerifyEmail />} />
      <Route path={routes.ACCOUNT_DELETED} element={<AccountDeleted />} />
      <Route path={`${routes.DECK}/:id`} element={<Deck />} />
      <Route path={"*"} element={<NotFound />} />
    </Routes>
  )
}

export default Router
