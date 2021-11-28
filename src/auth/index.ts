import { createAuthProvider } from "react-token-auth"
import { Session } from "../common/types"

export const { useAuth, authFetch, login, logout } =
  createAuthProvider<Session>({
    getAccessToken: (session) => session.access_token,
    storage: localStorage,
    onUpdateToken: (session) =>
      fetch("/api/refresh", {
        method: "POST",
        body: session.refresh_token
      }).then((r) => r.json())
  })
