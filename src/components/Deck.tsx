import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  ButtonGroup,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  List,
  ListIcon,
  ListItem,
  Skeleton,
  Text,
  useDisclosure,
  useToast,
  VStack
} from "@chakra-ui/react"
import React, { useRef, useState } from "react"
import { useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import {
  AnswerType,
  AnswerTypesCounter,
  Card,
  Deck as DeckType
} from "../common/types"
import CreateCardButton from "./CreateCardButton"
import CardEdit from "./CardEdit"
import HttpStatusCode from "../constants/httpStatusCode"
import { PROFILE } from "../constants/routes"
import { CheckCircleIcon, QuestionIcon, CloseIcon } from "@chakra-ui/icons"
import { useTimer } from "use-timer"
import { formatTime } from "../common/utils"

const Deck = () => {
  const params = useParams()
  const { id } = params

  const {
    data: deck,
    isLoading,
    isError
  } = useQuery<DeckType, Error>("getDeckById", async () => {
    return await (await fetch(`/deck/get/${id}`)).json()
  })

  const [showEditSection, setShowEditSection] = useState(true)
  const [showStudySection, setShowStudySection] = useState(false)

  const handleShowSection = (e: React.MouseEvent<HTMLButtonElement>) => {
    const t = e.target as HTMLButtonElement

    switch (t.getAttribute("name")) {
      case "edit":
      default:
        setShowEditSection(true)
        setShowStudySection(false)
        break
      case "study":
        setShowEditSection(false)
        setShowStudySection(true)
        break
    }
  }

  if (isLoading) {
    return (
      <Flex direction="column" flex="1">
        <Box p="15px">
          <Skeleton w="250px" h="60px" />

          <HStack>
            <Text fontSize="2xl">
              <b>Category: </b>
            </Text>
            <Skeleton w="120px" h="30px" />
          </HStack>
          <Skeleton w="120px" h="30px" />
        </Box>
        <Flex flex="1" m="2" alignItems="center">
          {/* Left Column*/}
          <Flex
            h="80%"
            minW="13%"
            direction="column"
            bg="gray.300"
            p="2"
            borderRadius="xl"
            justify="space-between"
          >
            <VStack w="100%">
              <Button w="100%" colorScheme="blue" width="max-content">
                Study !
              </Button>
              <Button w="100%" colorScheme="blue">
                Edit deck
              </Button>
            </VStack>
            <Button colorScheme="red">Delete</Button>
          </Flex>
          {/* Right area*/}
          <Box
            border="solid 1px black"
            rounded="xl"
            bg="yellow.100"
            flex="1"
            h="100%"
            ml="20px"
            p="15px"
          >
            test
          </Box>
        </Flex>
      </Flex>
    )
  }

  if (isError) {
    return <Center>merde</Center>
  }

  const deckSize = deck?.cards?.length

  console.log(JSON.stringify(deck?.cards))

  return (
    <Flex direction="column" flex="1">
      <Box p="15px">
        <Heading size="3xl">{deck?.name}</Heading>
        <Text fontSize="2xl">
          <b>Category: </b>
          {deck?.theme}
        </Text>
        <Text fontSize="2xl">
          {deckSize === 0 || deckSize === undefined
            ? "Deck is empty"
            : `${deckSize} card${deckSize > 1 ? "s" : ""}`}
        </Text>
      </Box>
      <Flex flex="1" m="2" alignItems="center">
        {/* Left Column*/}
        <Flex
          h="80%"
          minW="13%"
          direction="column"
          bg="gray.300"
          p="2"
          borderRadius="xl"
          justify="space-between"
        >
          <VStack w="100%">
            <Button
              w="100%"
              colorScheme="blue"
              width="max-content"
              name="study"
              onClick={handleShowSection}
            >
              Study !
            </Button>
            <Button
              w="100%"
              colorScheme="blue"
              onClick={handleShowSection}
              name="edit"
            >
              Edit deck
            </Button>
          </VStack>
          <DeleteDeck deckId={deck?.id} />
        </Flex>
        {/* Right area*/}
        <Box
          border="solid 1px black"
          rounded="xl"
          bg="yellow.100"
          flex="1"
          h="100%"
          ml="20px"
          p="15px"
        >
          {showEditSection ? (
            <EditDeck deck={deck} />
          ) : (
            <StudyDeck deck={deck} />
          )}
        </Box>
      </Flex>
    </Flex>
  )
}

const EditDeck = ({ deck }: { deck: DeckType | undefined }) => (
  <Flex wrap="wrap">
    <React.Fragment>
      {deck?.cards
        ?.sort((c1, c2) => {
          if (c1.id > c2.id) {
            return 1
          }
          return -1
        })
        .map((card, idx) => (
          <CardEdit key={idx} card={card} />
        ))}
    </React.Fragment>

    <CreateCardButton deckId={deck?.id} />
  </Flex>
)

const StudyDeck = ({ deck }: { deck: DeckType | undefined }) => {
  const [isShowFront, setIsShowFront] = useState(true)

  const [answersType, setAnswersType] = useState<AnswerTypesCounter>({
    correct: 0,
    hesitant: 0,
    wrong: 0
  })

  const filteredDeck = deck?.cards?.filter((card) => card.is_active)
  const [currentCard, setCurrentCard] = useState<Card | undefined>(
    filteredDeck![0]
  )

  const [totalTime, setTotalTime] = useState(0)
  const { time, start, pause, reset, status } = useTimer({
    autostart: true,
    interval: 1000
  })

  const flipCard = () => {
    setIsShowFront(false)
    pause()

    /* update the total time */
    setTotalTime((prevTotalTime) => prevTotalTime + time)
  }

  const getNextCard = (e: React.MouseEvent<HTMLButtonElement>) => {
    /* we get the index of the next card to display */
    let idx = filteredDeck!.findIndex((c) => c.id === currentCard!?.id)
    if (idx === filteredDeck!.length - 1) {
      idx = 0 /* if last card, back to the start */
    } else {
      idx++
    }
    /* for the moment this is infinite... TODO: make the actual algorithm */

    /* we update the counters of answers type */
    let t = e.target as HTMLButtonElement
    const answer = t.getAttribute("name") as AnswerType
    setAnswersType({ ...answersType, [answer]: answersType[answer] + 1 })

    /* reset the timer */
    reset()

    start()
    setIsShowFront(true)
    setCurrentCard(filteredDeck![idx])
  }

  return (
    <Flex flex="1" h="100%" justifyContent="space-around" alignItems="center">
      <Box
        border="solid 1px black"
        h="100%"
        display="flex"
        flexDirection="column"
      >
        <Heading size="xl">Infos</Heading>
        <Box>
          <Heading size="lg">Answers</Heading>
          <List>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Correct: {answersType.correct}
            </ListItem>

            <ListItem>
              <ListIcon as={QuestionIcon} color="orange.500" />
              Hesitant: {answersType.hesitant}
            </ListItem>
            <ListItem>
              <ListIcon as={CloseIcon} color="red.500" />
              Wrong: {answersType.wrong}
            </ListItem>
          </List>
        </Box>
        <Divider />
        <Box>
          <Heading size="lg">Total Time</Heading>
          <Text>{formatTime(totalTime)}</Text>
        </Box>
        <Divider />
        <Box>
          <Heading size="lg">On this card</Heading>
          <Text>{formatTime(time)}</Text>
        </Box>
      </Box>
      {isShowFront ? (
        <Flex alignItems="center" justifyContent="center">
          <Box
            bg="white"
            h="400px"
            w="400px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {currentCard!?.front}
          </Box>
          <Button onClick={flipCard}>Show answer</Button>
        </Flex>
      ) : (
        <Flex alignItems="center" justifyContent="center">
          <Box
            bg="white"
            h="400px"
            w="400px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {currentCard!?.back}
          </Box>
          <Flex direction="column" justifyContent="center">
            <Text>Rate your answer</Text>
            <ButtonGroup>
              <Button name="correct" onClick={getNextCard}>
                Correct
              </Button>
              <Button name="hesitant" onClick={getNextCard}>
                Hesitant
              </Button>
              <Button name="wrong" onClick={getNextCard}>
                Wrong
              </Button>
            </ButtonGroup>
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

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

export default Deck
