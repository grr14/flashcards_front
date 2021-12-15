/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react"
import React, { useRef } from "react"

import { Button } from "@chakra-ui/button"
import {
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
import * as yup from "yup"
import { Field, Form, Formik, FormikState } from "formik"
import { useNavigate } from "react-router"
import { VERIFY_EMAIL } from "../constants/routes"

interface RegisterFormValues {
  username: string
  email: string
  password: string
}

const RegisterForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const validationSchema = yup.object({
    username: yup
      .string()
      .min(8, "Username should be of minimum 8 characters length")
      .required("Username is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required")
  })

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
        username: username,
        email: email,
        password: password
      })
    })

    const data = await response.json()
    if (response.status === 200) {
      console.log("super !!")
      onClose()
      resetForm()
      navigate(VERIFY_EMAIL)
    } else {
      alert(`message = ${data.message}`)
    }
  }

  return (
    <React.Fragment>
      <Button onClick={onOpen}>Register</Button>

      <Formik
        initialValues={{
          username: "",
          email: "",
          password: ""
        }}
        validationSchema={validationSchema}
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

                <ModalBody>
                  <Field name="username">
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.username && form.touched.username
                        }
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
                </ModalBody>

                <ModalFooter>
                  {
                    <Button type="submit" colorScheme="blue" mr={3}>
                      Register
                    </Button>
                  }
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
