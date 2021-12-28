import { Box, Flex } from "@chakra-ui/react"
import { useQuery } from "react-query"

import { BrowserRouter } from "react-router-dom"
import { authFetch, useAuth } from "./auth"
import { User } from "./common/types"

import Footer from "./components/Footer"
import Header from "./components/Header"
import Router from "./router/Router"

const App = () => {
  const [isLogged] = useAuth()

  const { data: user } = useQuery<User, Error>("getUsername", async () => {
    return await (await authFetch("/api/me")).json()
  })

  return (
    <BrowserRouter>
      <Flex direction="column" flex="1">
        <Header username={user?.username} />
        <Box bg="gray.50" flex="1" display="flex">
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Router isLogged={isLogged} user={user} />
        </Box>
        <Footer />
      </Flex>
    </BrowserRouter>
  )
}

export default App
