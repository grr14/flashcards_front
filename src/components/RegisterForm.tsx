import React, { useRef } from "react"

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
  useDisclosure
} from "@chakra-ui/react"
import { Field, Form, Formik, FormikState } from "formik"
import { useNavigate } from "react-router"
import { VERIFY_EMAIL } from "../constants/routes"
import { RegisterFormValues } from "../common/types"
import { registerFormValidationSchema } from "../constants/form"

const RegisterForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const onSubmitRegister = async (
    values: RegisterFormValues,
    resetForm: (
      nextState?: Partial<FormikState<RegisterFormValues>> | undefined
    ) => void
  ) => {
    const { username, email, password } = values
    const response = await fetch(`/api/register`, {
      method: "post",
      body: JSON.stringify({
        username,
        email,
        password
      })
    })

    const data = await response.json()
    if (response.status === 200) {
      onClose()
      resetForm()
      navigate(VERIFY_EMAIL)
    } else {
      alert(`message = ${data.message}`)
    }
  }

  return (
    <React.Fragment>
      <Button onClick={onOpen} size="md">
        Register
      </Button>

      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          passwordConfirmation: ""
        }}
        validationSchema={registerFormValidationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmitRegister(values, resetForm)
        }}
      >
        {() => (
          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <Form>
              <ModalContent>
                <ModalHeader>Create your account</ModalHeader>
                <ModalCloseButton />
                <Divider mb={15} />
                <ModalBody>
                  <Field name="username">
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
                          ref={initialRef}
                        />
                        <FormErrorMessage>
                          {form.errors.username}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="email" type="email">
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                        isRequired
                        mb={15}
                      >
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input {...field} id="email" placeholder="email" />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
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
                        <Input
                          {...field}
                          id="password"
                          placeholder="password"
                          type="password"
                        />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="passwordConfirmation">
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.passwordConfirmation &&
                          form.touched.passwordConfirmation
                        }
                        isRequired
                      >
                        <FormLabel htmlFor="passwordConfirmation">
                          Confirm your password
                        </FormLabel>
                        <Input
                          {...field}
                          id="passwordConfirmation"
                          placeholder="password"
                          type="password"
                        />
                        <FormErrorMessage>
                          {form.errors.passwordConfirmation}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>
                <ModalFooter>
                  <Button type="submit" colorScheme="blue" mr={5}>
                    Register
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

export default RegisterForm
