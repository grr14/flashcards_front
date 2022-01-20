import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Skeleton,
  Text,
  VStack
} from "@chakra-ui/react"
import React, { useState } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { Deck as DeckType } from "../common/types"
import DeleteDeck from "./DeleteDeck"
import EditDeck from "./EditDeck"
import StudyDeck from "./StudyDeck"

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
            {showStudySection}
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
      {/* Top left Box*/}
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
          rounded="xl"
          //border="solid 1px black"
          //bg="yellow.100"
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

export default Deck
