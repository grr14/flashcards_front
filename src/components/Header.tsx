import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  Spacer
} from "@chakra-ui/react"
import { useNavigate } from "react-router"
import { logout, useAuth } from "../auth"
import { HOME } from "../constants/routes"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import UserDropdown from "./UserDropdown"

interface HeaderProps {
  username: string | undefined
  isLogged?: boolean
  isOpenLoginModal: boolean
  setOpenLoginModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({
  username,
  isOpenLoginModal,
  setOpenLoginModal
}: HeaderProps) => {
  const [isLogged] = useAuth()
  const navigate = useNavigate()

  return (
    <Flex alignItems="center" p="5px 10px" bg="blue.700">
      <Box as="a" href={HOME} p="2">
        <Heading size="2xl" color="gray.50">
          FLASHCARDSLAB
        </Heading>
      </Box>
      <Spacer />
      {!isLogged ? (
        <ButtonGroup spacing="3">
          <LoginForm
            isOpenLoginModal={isOpenLoginModal}
            setOpenLoginModal={setOpenLoginModal}
          />
          <RegisterForm />
        </ButtonGroup>
      ) : (
        <HStack>
          <UserDropdown username={username} />
          <Button
            onClick={() => {
              logout()
              navigate(HOME)
            }}
          >
            Logout
          </Button>
        </HStack>
      )}
    </Flex>
  )
}

export default Header
