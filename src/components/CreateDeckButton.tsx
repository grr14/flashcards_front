import { AddIcon } from "@chakra-ui/icons"
import {
  Button,
  Checkbox,
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
  Text,
  useDisclosure,
  useToast
} from "@chakra-ui/react"
import { Field, Form, Formik, FormikState } from "formik"
import React, { useRef } from "react"
import { useMutation, useQueryClient } from "react-query"
import { CreateDeckFormValues, Deck } from "../common/types"
import { createDeckFormValidationSchema } from "../constants/form"

const CreateDeckButton = ({
  userId,
  isFromHome
}: {
  userId: number | undefined
  isFromHome?: boolean
}) => {
  const toast = useToast()
  const { isOpen, onOpen: openCreateDeckModal, onClose } = useDisclosure()

  const [isFirstTimeOpened, setIsFirstTimeOpened] = React.useState(
    isFromHome || false
  )

  const handleOpen = () => {
    return isOpen || isFirstTimeOpened
  }

  const handleClose = () => {
    setIsFirstTimeOpened(false)
    onClose()
  }

  const initialRef = useRef<HTMLInputElement>(null)

  const queryClient = useQueryClient()
  const createDeck = useMutation(
    async (deck: Partial<Deck>) => {
      return await (
        await fetch(`/deck/create/${userId}`, {
          method: "post",
          body: JSON.stringify({
            name: deck.name,
            theme: deck.theme,
            is_public: deck.is_public
          })
        })
      ).json()
    },
    {
      onSuccess: () => {
        /* this refetches the deck for faster UI update */
        queryClient.invalidateQueries("getAllUserDecks")
      }
    }
  )

  const onSubmitCreateDeck = async (
    values: CreateDeckFormValues,
    resetForm: (
      nextState?: Partial<FormikState<CreateDeckFormValues>> | undefined
    ) => void
  ) => {
    const { name, theme, isPublic } = values
    console.log(`values=${JSON.stringify(values)}`)

    createDeck.mutate(
      {
        name,
        theme,
        is_public: isPublic
      },
      {
        onSuccess: () => {
          onClose()
          resetForm()
        },
        onError: () => {
          toast({
            title: "Error",
            description: "An error occured. Could not create the deck.",
            status: "error",
            duration: 5000,
            isClosable: true
          })
        }
      }
    )
  }

  return (
    <React.Fragment>
      <Button
        ml="20px"
        colorScheme="blue"
        leftIcon={<AddIcon />}
        onClick={openCreateDeckModal}
      >
        Create New Deck
      </Button>

      <Formik
        initialValues={{
          name: "",
          theme: "",
          isPublic: false
        }}
        validationSchema={createDeckFormValidationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmitCreateDeck(values, resetForm)
        }}
      >
        {(values) => (
          <Modal
            initialFocusRef={initialRef}
            isOpen={handleOpen()}
            onClose={handleClose}
            isCentered
          >
            <ModalOverlay />

            <Form>
              <ModalContent bg="gray.100">
                <ModalHeader>Create a deck</ModalHeader>
                <ModalCloseButton />
                <Divider mb={15} />

                <ModalBody>
                  <Field name="name">
                    {/* https://github.com/jaredpalmer/formik/issues/2086 */}
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                        isRequired
                        mb={15}
                      >
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input
                          {...field}
                          id="name"
                          placeholder="Choose a name for the deck"
                          ref={initialRef}
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="theme">
                    {/* https://github.com/jaredpalmer/formik/issues/2086 */}
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={form.errors.theme && form.touched.theme}
                        isRequired
                        mb={15}
                      >
                        <FormLabel htmlFor="theme">Category</FormLabel>
                        <Input
                          {...field}
                          id="theme"
                          placeholder="Language, science, history, geography..."
                        />
                        <FormErrorMessage>{form.errors.theme}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="isPublic">
                    {() => (
                      <FormControl mt="25px" id="isPublic" isRequired mb={15}>
                        <Checkbox
                          id="isPublic"
                          name="isPublic"
                          onChange={(e) =>
                            values.setFieldValue("isPublic", e.target.checked)
                          }
                        >
                          <Text textAlign="right">Make the deck public</Text>
                        </Checkbox>
                        <Text fontSize="sm">
                          Public decks are visible by other users in the browse
                          decks section.
                        </Text>
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>

                <ModalFooter>
                  <Button type="submit" colorScheme="blue" mr={"5px"}>
                    Add
                  </Button>
                  <Button colorScheme="blue" onClick={handleClose}>
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Form>
          </Modal>
        )}
      </Formik>
    </React.Fragment>
  )
}

export default CreateDeckButton
