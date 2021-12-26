import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  Spacer
} from "@chakra-ui/react"
import { useQuery } from "react-query"
import { useNavigate } from "react-router"
import { authFetch, logout, useAuth } from "../auth"
import { User } from "../common/types"
import { HOME } from "../constants/routes"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import UserDropdown from "./UserDropdown"

interface HeaderProps {
  username: string | undefined
  isLogged?: boolean
}

const Header = ({ username }: HeaderProps) => {
  const [isLogged] = useAuth()
  const navigate = useNavigate()

  return (
    <Flex alignItems="center" p="5px 10px" backgroundColor="blue.700">
      <Box as="a" href={HOME} p="2">
        <Heading size="2xl" color="gray.50">
          flashcards - {isLogged.toString()}
        </Heading>
      </Box>
      <Spacer />
      {!isLogged ? (
        <ButtonGroup spacing="3">
          <LoginForm />
          <RegisterForm />
        </ButtonGroup>
      ) : (
        <HStack>
          <UserDropdown username={username} />
          <Button onClick={() => (logout(), navigate(HOME))}>Logout</Button>
        </HStack>
      )}
    </Flex>
  )
}

export default Header
