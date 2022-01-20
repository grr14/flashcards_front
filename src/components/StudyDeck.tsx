import {
  CheckCircleIcon,
  QuestionIcon,
  CloseIcon,
  RepeatIcon
} from "@chakra-ui/icons"
import {
  Flex,
  Box,
  Heading,
  Grid,
  Text,
  GridItem,
  List,
  ListItem,
  ListIcon,
  Divider,
  Button,
  ButtonGroup
} from "@chakra-ui/react"
import { useState } from "react"
import { useTimer } from "use-timer"
import { AnswerTypesCounter, Card, AnswerType, Deck } from "../common/types"
import { formatTime } from "../common/utils"

const TimerDisplay = ({ time }: { time: number }) => (
  <Box bg="gray.700" border="solid 3px" borderColor="gray.300">
    <Text
      color="gray.50"
      textAlign="right"
      p="2px"
      mr="5px"
      fontSize="lg"
      fontFamily="courier"
    >
      {formatTime(time)}
    </Text>
  </Box>
)

const StudyDeck = ({ deck }: { deck: Deck | undefined }) => {
  const [isShowFront, setIsShowFront] = useState(true)
  const [cardsStudied, setCardsStudied] = useState(0)

  const initialAnswers: AnswerTypesCounter = {
    correct: 0,
    hesitant: 0,
    wrong: 0
  }
  const [answersType, setAnswersType] =
    useState<AnswerTypesCounter>(initialAnswers)

  const filteredDeck = deck?.cards
    ?.filter((card) => card.is_active)
    .sort((c1, c2) => {
      if (c1.id > c2.id) {
        return 1
      }
      return -1
    })
  const [currentCard, setCurrentCard] = useState<Card | undefined>(
    filteredDeck![0]
  )

  const [totalTime, setTotalTime] = useState(0)
  const { time, start, pause, reset } = useTimer({
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

    /* update cards studied counter */
    setCardsStudied((prevCount) => prevCount + 1)

    /* reset the timer */
    reset()

    start()
    setIsShowFront(true)
    setCurrentCard(filteredDeck![idx])
  }

  const restart = () => {
    setAnswersType(initialAnswers)
    reset()
    setIsShowFront(true)
    setCurrentCard(filteredDeck![0])
    setTotalTime(0)
    setCardsStudied(0)
    start()
  }

  if (deck?.cards?.length === 0) {
    return (
      <Flex h="100%" justifyContent="center" alignItems="center">
        <Box
          direction="column"
          justifyContent="center"
          alignItems="center"
          padding="40px"
          bg="gray.300"
          borderRadius="lg"
          boxShadow="xl"
        >
          <Heading fontSize="larger">The deck is empty.</Heading>
          <Text fontSize="medium">
            Before studying, you must add some cards into it.
          </Text>
        </Box>
      </Flex>
    )
  }

  return (
    <Grid templateColumns="repeat(3, 1fr)" h="100%">
      <GridItem h="100%" display="flex" justifyContent="center">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          w="50%"
          boxShadow="lg"
          borderRadius="xl"
          bg="gray.300"
          p="5px 15px"
        >
          <Heading size="xl" mb="10px">
            This Session:
          </Heading>
          <Box mb="5px">
            <Text fontSize="lg">Cards studied: {cardsStudied}</Text>
          </Box>
          <Box mb="15px">
            <Heading size="lg">Answers</Heading>
            <List>
              <ListItem ml="10px" display="flex" alignItems="center">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                <Text fontSize="lg">Correct: {answersType.correct}</Text>
              </ListItem>

              <ListItem ml="10px" display="flex" alignItems="center">
                <ListIcon as={QuestionIcon} color="orange.500" />
                <Text fontSize="lg">Hesitant: {answersType.hesitant}</Text>
              </ListItem>
              <ListItem ml="10px" display="flex" alignItems="center">
                <ListIcon as={CloseIcon} color="red.500" />
                <Text fontSize="lg">Wrong: {answersType.wrong}</Text>
              </ListItem>
            </List>
          </Box>
          <Divider />
          <Box m="10px 0 5px 0">
            <Heading size="lg" mb="5px">
              Answer Time
            </Heading>
            <TimerDisplay time={time} />
          </Box>
          <Box mb="5px">
            <Heading size="lg" mb="5px">
              Total Time
            </Heading>
            <TimerDisplay time={totalTime} />
          </Box>
          <Box alignSelf="center" justifySelf="flex-end" mt="auto" mb="15px">
            <Button
              colorScheme="blue"
              leftIcon={<RepeatIcon />}
              onClick={restart}
            >
              Restart
            </Button>
          </Box>
        </Box>
      </GridItem>
      {isShowFront ? (
        <>
          <GridItem
            h="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Heading mb="15px">Question</Heading>
            <Box
              bg="white"
              boxShadow="xl"
              borderRadius="md"
              h="400px"
              w="400px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize="3xl">{currentCard!?.front}</Text>
            </Box>
          </GridItem>
          <GridItem
            display="flex"
            justifyContent="center"
            alignItems="center"
            w="100%"
            h="100%"
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              p="15px"
              boxShadow="lg"
              borderRadius="xl"
              bg="gray.300"
            >
              <Heading fontSize="lg" mb="20px">
                Click to see the answer!
              </Heading>
              <Button onClick={flipCard}>Flip card</Button>
            </Box>
          </GridItem>
        </>
      ) : (
        <>
          <GridItem
            h="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Heading mb="15px">Answer</Heading>
            <Box
              bg="white"
              boxShadow="xl"
              borderRadius="md"
              h="400px"
              w="400px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize="3xl">{currentCard!?.back}</Text>
            </Box>
          </GridItem>
          <GridItem
            display="flex"
            justifyContent="center"
            alignItems="center"
            w="100%"
            h="100%"
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              p="15px"
              boxShadow="lg"
              borderRadius="xl"
              bg="gray.300"
            >
              <Heading fontSize="xl" mb="20px">
                Evaluate your answer
              </Heading>
              <ButtonGroup>
                <Button
                  colorScheme="gray"
                  color="green.500"
                  name="correct"
                  onClick={getNextCard}
                >
                  Correct
                </Button>
                <Button
                  colorScheme="gray"
                  color="orange.500"
                  name="hesitant"
                  onClick={getNextCard}
                >
                  Hesitant
                </Button>
                <Button
                  colorScheme="gray"
                  color="red.500"
                  name="wrong"
                  onClick={getNextCard}
                >
                  Wrong
                </Button>
              </ButtonGroup>
            </Box>
          </GridItem>
        </>
      )}
    </Grid>
  )
}

export default StudyDeck
