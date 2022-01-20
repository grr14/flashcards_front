import {
  useDisclosure,
  useToast,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter
} from "@chakra-ui/react"
import React, { useRef } from "react"
import { useNavigate } from "react-router-dom"
import HttpStatusCode from "../constants/httpStatusCode"
import { PROFILE } from "../constants/routes"

const DeleteDeck = ({ deckId }: { deckId: number | undefined }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)

  const toast = useToast()
  const navigate = useNavigate()

  const deleteDeck = async () => {
    const response = await fetch(`/deck/delete/${deckId}`, {
      method: "delete"
    })
    const data = await response.json()
    if (response.status === HttpStatusCode.BAD_REQUEST) {
      toast({
        title: "Error",
        description: data.message,
        status: "error",
        duration: 5000,
        isClosable: true
      })
    } else if (response.ok) {
      navigate(PROFILE)
    }
  }

  return (
    <React.Fragment>
      <Button onClick={onOpen} colorScheme="red">
        Delete
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete the Deck
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={deleteDeck} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </React.Fragment>
  )
}

export default DeleteDeck
