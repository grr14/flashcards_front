import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast
} from "@chakra-ui/react"
import { FormikState, Formik, Field, Form } from "formik"
import React, { useState } from "react"
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery
} from "react-query"
import { useNavigate } from "react-router-dom"
import { authFetch, logout } from "../auth"
import {
  ChangeEmailFormValues,
  ChangePasswordFormValues,
  User
} from "../common/types"
import {
  changeEmailFormValidationSchema,
  changePasswordFormValidationSchema
} from "../constants/form"
import { ACCOUNT_DELETED } from "../constants/routes"
import PasswordInput from "./PasswordInput"

const Settings = () => {
  const { data: user, refetch } = useQuery<User, Error>(
    "getUsername",
    async () => {
      return await (await authFetch("/api/me")).json()
    }
  )

  return (
    <Flex flex="1" margin="2">
      <Flex direction="column">
        <Box
          border="solid 1px black"
          borderRadius="2xl"
          backgroundColor="yellow.300"
          p="10px"
        >
          <ChangeEmail
            username={user?.username}
            email={user?.email}
            refetch={refetch}
          />
        </Box>
        <Box
          border="solid 1px black"
          borderRadius="2xl"
          backgroundColor="yellow.300"
          p="10px"
          mt="10px"
        >
          <ChangePassword username={user?.username} />
        </Box>

        <Box
          border="solid 1px black"
          borderRadius="2xl"
          backgroundColor="yellow.300"
          p="10px"
          mt="10px"
        >
          <DeleteAccount username={user?.username} />
        </Box>
      </Flex>
    </Flex>
  )
}

interface ChangeEmailProps {
  username: string | undefined
  email: string | undefined
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<User, Error>>
}

const ChangeEmail = ({ username, email, refetch }: ChangeEmailProps) => {
  const toast = useToast()

  const onSubmitChangeEmail = async (
    values: ChangeEmailFormValues,
    resetForm: (
      nextState?: Partial<FormikState<ChangeEmailFormValues>> | undefined
    ) => void
  ) => {
    const { newEmail, newEmailConfirmation } = values
    const response = await fetch(`/api/change-email`, {
      method: "put",
      body: JSON.stringify({
        username: username,
        newEmail,
        newEmailConfirmation
      })
    })
    const data = await response.json()
    if (response.ok) {
      toast({
        title: "Success",
        description: data.message,
        status: "success",
        duration: 5000,
        isClosable: true
      })
      refetch()
      resetForm()
    }
  }

  return (
    <React.Fragment>
      <Heading>Change your Email</Heading>
      <Text>Your current email is: {email || "..."}</Text>
      <Text>
        You want to change your email? Please enter the new email and the
        confirmation below.
      </Text>
      <Formik
        initialValues={{
          newEmail: "",
          newEmailConfirmation: ""
        }}
        validationSchema={changeEmailFormValidationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmitChangeEmail(values, resetForm)
        }}
      >
        {() => (
          <Form>
            <Field name="newEmail">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.newEmail && form.touched.newEmail}
                  isRequired
                  mb={15}
                >
                  <FormLabel htmlFor="newEmail">new Email</FormLabel>
                  <Input {...field} id="newEmail" placeholder="newEmail" />
                  <FormErrorMessage>{form.errors.newEmail}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="newEmailConfirmation">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={
                    form.errors.newEmailConfirmation &&
                    form.touched.newEmailConfirmation
                  }
                  isRequired
                  mb={15}
                >
                  <FormLabel htmlFor="newEmailConfirmation">
                    confirm the new Email
                  </FormLabel>
                  <Input
                    {...field}
                    id="newEmailConfirmation"
                    placeholder="newEmailConfirmation"
                  />
                  <FormErrorMessage>
                    {form.errors.newEmailConfirmation}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button type="submit" colorScheme="blue" mr={5}>
              Change your email
            </Button>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  )
}

interface ChangePasswordProps {
  username: string | undefined
}

const ChangePassword = ({ username }: ChangePasswordProps) => {
  const toast = useToast()

  const onSubmitChangePassword = async (
    values: ChangePasswordFormValues,
    resetForm: (
      nextState?: Partial<FormikState<ChangePasswordFormValues>> | undefined
    ) => void
  ) => {
    const { oldPassword, newPassword, newPasswordConfirmation } = values
    const response = await fetch(`/api/change-password`, {
      method: "put",
      body: JSON.stringify({
        username: username,
        oldPassword,
        newPassword,
        newPasswordConfirmation
      })
    })
    const data = await response.json()
    if (response.status === 400) {
      toast({
        title: "Error",
        description: data.message,
        status: "error",
        duration: 5000,
        isClosable: true
      })
    } else if (response.ok) {
      toast({
        title: "Success",
        description: data.message,
        status: "success",
        duration: 5000,
        isClosable: true
      })
    }
    resetForm()
  }

  return (
    <React.Fragment>
      <Heading>Change your Password</Heading>
      <Text>
        You want to change your Password? Please enter the new Password and the
        confirmation below.
      </Text>
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          newPasswordConfirmation: ""
        }}
        validationSchema={changePasswordFormValidationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmitChangePassword(values, resetForm)
        }}
      >
        {() => (
          <Form>
            <Field name="oldPassword">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={
                    form.errors.oldPassword && form.touched.oldPassword
                  }
                  isRequired
                  mb={15}
                >
                  <FormLabel htmlFor="oldPassword">old Password</FormLabel>
                  <PasswordInput
                    id={"oldPassword"}
                    placeholder={"Old password"}
                    field={field}
                  />
                  <FormErrorMessage>{form.errors.oldPassword}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="newPassword">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={
                    form.errors.newPassword && form.touched.newPassword
                  }
                  isRequired
                  mb={15}
                >
                  <FormLabel htmlFor="newPassword">new Password</FormLabel>
                  <PasswordInput
                    id="newPassword"
                    placeholder="new Password"
                    field={field}
                  />
                  <FormErrorMessage>{form.errors.newPassword}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="newPasswordConfirmation">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={
                    form.errors.newPasswordConfirmation &&
                    form.touched.newPasswordConfirmation
                  }
                  isRequired
                  mb={15}
                >
                  <FormLabel htmlFor="newPasswordConfirmation">
                    confirm the new Password
                  </FormLabel>
                  <PasswordInput
                    id={"newPasswordConfirmation"}
                    placeholder={"new password confirmation"}
                    field={field}
                  />
                  <FormErrorMessage>
                    {form.errors.newPasswordConfirmation}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button type="submit" colorScheme="blue" mr={5}>
              Change your Password
            </Button>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  )
}

const DeleteAccount = ({ username }: { username: string | undefined }) => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const toast = useToast()
  const navigate = useNavigate()
  const deleteAccount = async () => {
    const response = await fetch(`/api/delete-account/${username}`, {
      method: "delete"
    })
    const data = await response.json()
    if (response.status === 400) {
      toast({
        title: "Error",
        description: data.message,
        status: "error",
        duration: 5000,
        isClosable: true
      })
    } else if (response.ok) {
      logout()
      navigate(ACCOUNT_DELETED)
    }
  }
  const cancelRef = React.useRef<HTMLButtonElement>(null)

  return (
    <React.Fragment>
      <Heading>Delete your account</Heading>
      <Text>
        Clicking here will delete your account definitly. Think carefully before
        you do it!
      </Text>
      <Button colorScheme="red" onClick={() => setIsOpen(true)}>
        Delete Account
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete your account
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={deleteAccount} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </React.Fragment>
  )
}

const AccountDeleted = () => {
  return (
    <Flex flex="1" margin="2">
      <Flex direction="column" flex="1" justify="center" align="center">
        <Heading>Account deleted</Heading>
        <Text>We have successfully deleted your account.</Text>
        <Text>
          All your personal data has been completly erased. We hope to see you
          again soon!
        </Text>
      </Flex>
    </Flex>
  )
}

export { Settings, AccountDeleted }
