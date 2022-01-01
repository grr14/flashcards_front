import { AddIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  Divider,
  Flex,
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
  useToast
} from "@chakra-ui/react"
import { FormikState, Formik, Field, Form } from "formik"
import React, { useRef } from "react"
import { useMutation, useQueryClient } from "react-query"
import { AddCardFormValues, Card } from "../common/types"
import { addCardFormValidationSchema } from "../constants/form"

const CreateCardButton = ({ deckId }: { deckId: number | undefined }) => {
  const toast = useToast()
  const { isOpen, onOpen: openAddCardModal, onClose } = useDisclosure()

  const initialRef = useRef<HTMLInputElement>(null)

  const queryClient = useQueryClient()
  const createCard = useMutation(
    async (c: Partial<Card>) => {
      return await (
        await fetch(`/card/create/${deckId}`, {
          method: "post",
          body: JSON.stringify({ front: c.front, back: c.back })
        })
      ).json()
    },
    {
      onSuccess: () => {
        /* this refetches the deck for faster UI update */
        queryClient.invalidateQueries("getDeckById")
      }
    }
  )

  const onSubmitAddCard = async (
    values: AddCardFormValues,
    resetForm: (
      nextState?: Partial<FormikState<AddCardFormValues>> | undefined
    ) => void
  ) => {
    const { front, back } = values

    createCard.mutate(
      {
        front,
        back
      },
      {
        onSuccess: () => {
          onClose()
          resetForm()
        },
        onError: () => {
          toast({
            title: "Error",
            description: "An error occured. Could not create the card",
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
      <Box
        rounded="xl"
        m="5px"
        w="240px"
        h="240px"
        overflow="hidden"
        border="7px solid"
        borderColor="blue.600"
        _hover={{
          cursor: "pointer"
        }}
        onClick={openAddCardModal}
      >
        <Flex justifyContent="center" alignItems="center" w="100%" h="100%">
          <AddIcon
            w="30%"
            h="30%"
            p="5px"
            color="blue.600"
            border="solid 5px"
            borderColor="blue.600"
            borderRadius="50%"
            _hover={{
              borderColor: "blue.700",
              color: "blue.700",
              cursor: "pointer"
            }}
          />
        </Flex>
      </Box>

      <Formik
        initialValues={{
          front: "",
          back: ""
        }}
        validationSchema={addCardFormValidationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmitAddCard(values, resetForm)
        }}
      >
        {() => (
          <Modal
            initialFocusRef={initialRef}
            isOpen={isOpen}
            onClose={onClose}
            isCentered
          >
            <ModalOverlay />

            <Form>
              <ModalContent>
                <ModalHeader>Create a flashcard</ModalHeader>
                <ModalCloseButton />
                <Divider mb={15} />

                <ModalBody>
                  <Field name="front">
                    {/* https://github.com/jaredpalmer/formik/issues/2086 */}
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={form.errors.front && form.touched.front}
                        isRequired
                        mb={15}
                      >
                        <FormLabel htmlFor="front">Front</FormLabel>
                        <Input
                          {...field}
                          id="front"
                          placeholder="The question..."
                          ref={initialRef}
                        />
                        <FormErrorMessage>{form.errors.front}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="back">
                    {/* https://github.com/jaredpalmer/formik/issues/2086 */}
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={form.errors.back && form.touched.back}
                        isRequired
                        mb={15}
                      >
                        <FormLabel htmlFor="back">Back</FormLabel>
                        <Input
                          {...field}
                          id="back"
                          placeholder="The answer..."
                        />
                        <FormErrorMessage>{form.errors.back}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>

                <ModalFooter>
                  <Button type="submit" colorScheme="blue" mr={"5px"}>
                    Add
                  </Button>
                  <Button colorScheme="blue" onClick={onClose}>
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

export default CreateCardButton
