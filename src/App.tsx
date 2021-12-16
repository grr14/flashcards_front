import { Box, Flex } from "@chakra-ui/react"

import { BrowserRouter } from "react-router-dom"
import { useAuth } from "./auth"

import Footer from "./components/Footer"
import Header from "./components/Header"
import Router from "./router/Router"

const App = () => {
  const [isLogged] = useAuth()
  return (
    <BrowserRouter>
      <Flex direction="column" flex="1">
        <Header />
        <Box bg="blue.50" flex="1">
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Router isLogged={isLogged} />
        </Box>
        <Footer />
      </Flex>
    </BrowserRouter>
  )
}

export default App
