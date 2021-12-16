/** @jsxRuntime classic */
/** @jsx jsx */

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text
} from "@chakra-ui/react"
import { css, jsx } from "@emotion/react"
import React from "react"
import { logout, useAuth } from "../auth"
import { HOME } from "../constants/routes"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

const Header = () => {
  const [isLogged] = useAuth()

  return (
    <Flex alignItems="center" m="5px 10px">
      <Box as="a" href={HOME} p="2">
        <Heading size="2xl">flashcards</Heading>
      </Box>
      <Spacer />
      {!isLogged ? (
        <ButtonGroup spacing="3">
          <LoginForm />
          <RegisterForm />
        </ButtonGroup>
      ) : (
        <React.Fragment>
          <HStack spacing="3">
            <Text>Hello, USER</Text>
            <Button onClick={() => logout()}>Logout</Button>
          </HStack>
        </React.Fragment>
      )}
    </Flex>
  )
}

export default Header
