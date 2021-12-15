/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react"
import React from "react"
import { useNavigate } from "react-router"
import { login } from "../auth"
import { Button } from "@chakra-ui/button"
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react"
import { User, Either, Session, LoginError } from "../common/types"
import { SECRET } from "../constants/routes"

const LoginForm = () => {
  const [userInput, setUserInput] = React.useState<Partial<User>>({
    username: "",
    password: ""
  })

  const navigate = useNavigate()
  const [authError, setAuthError] = React.useState<boolean>(false)

  const onSubmitClick = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    console.log(userInput)
    const response = await fetch(`/api/login`, {
      method: "post",
      body: JSON.stringify(userInput)
    })

    const data: Either<Session, LoginError> = await response.json()
    if (response.ok) {
      setAuthError(false)
      if (data.access_token) {
        login(data)
        navigate(SECRET)
      } else {
        console.log("error")
      }
    } else {
      setAuthError(true)
      console.log(`error = ${JSON.stringify(data)}`)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value })
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <React.Fragment>
      <Button onClick={onOpen}>Login</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
              `}
            >
              <form
                action="#"
                css={css`
                  display: flex;
                `}
              >
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                    value={userInput.username}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={userInput.password}
                  />
                </div>
              </form>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onSubmitClick} type="submit">
              Login
            </Button>

            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  )
}

export default LoginForm
