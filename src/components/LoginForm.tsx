import React from "react"
import { useNavigate } from "react-router"
import { login } from "../auth"
import { Button } from "@chakra-ui/button"
import {
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Alert,
  AlertIcon
} from "@chakra-ui/react"
import { Either, Session, LoginError, LoginFormValues } from "../common/types"
import { SECRET } from "../constants/routes"
import { Field, Form, Formik, FormikState } from "formik"
import PasswordInput from "./PasswordInput"
import { loginFormValidationSchema } from "../constants/form"

const LoginForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const navigate = useNavigate()
  const [authError, setAuthError] = React.useState<boolean>(false)

  const onSubmitLogin = async (
    values: LoginFormValues,
    resetForm: (
      nextState?: Partial<FormikState<LoginFormValues>> | undefined
    ) => void
  ) => {
    const { username, password } = values
    const response = await fetch(`/api/login`, {
      method: "post",
      body: JSON.stringify({
        username,
        password
      })
    })

    const data: Either<Session, LoginError> = await response.json()
    if (response.ok) {
      setAuthError(false)
      if (data.access_token) {
        setAuthError(false)
        login(data)
        onClose()
        resetForm()
        navigate(SECRET)
      } else {
        console.log("error")
      }
    } else {
      setAuthError(true)
      console.log(`error = ${JSON.stringify(data)}`)
    }
  }

  return (
    <React.Fragment>
      <Button onClick={onOpen} size="md">
        Login
      </Button>

      <Formik
        initialValues={{
          username: "",
          password: ""
        }}
        validationSchema={loginFormValidationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmitLogin(values, resetForm)
        }}
      >
        {() => (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <Form>
              <ModalContent>
                <ModalHeader>Login</ModalHeader>
                <ModalCloseButton />
                <Divider mb={15} />
                <ModalBody>
                  <Field name="username">
                    {/* https://github.com/jaredpalmer/formik/issues/2086 */}
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.username && form.touched.username
                        }
                        isRequired
                        mb={15}
                      >
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <Input
                          {...field}
                          id="username"
                          placeholder="username"
                        />
                        <FormErrorMessage>
                          {form.errors.username}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                        isRequired
                        mb={15}
                      >
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <PasswordInput
                          id={"password"}
                          placeholder={"password"}
                          field={field}
                        />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  {authError && (
                    <Alert status="error">
                      <AlertIcon />
                      Invalid credentials. Please try again.
                    </Alert>
                  )}
                </ModalBody>

                <ModalFooter width="100%">
                  <Button type="submit" colorScheme="blue" mr={5}>
                    Login
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Form>
          </Modal>
        )}
      </Formik>
    </React.Fragment>
  )
}

export default LoginForm
