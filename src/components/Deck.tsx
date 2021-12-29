import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  VStack
} from "@chakra-ui/react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { Deck as DeckType } from "../common/types"

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

  if (isLoading) {
    return <Center>Loading....</Center>
  }

  if (isError) {
    return <Center>merde</Center>
  }

  const deckSize = deck?.cards?.length

  return (
    <Flex direction="column" flex="1">
      <Box p="15px">
        <Heading size="3xl">{deck?.name}</Heading>
        <Text fontSize="2xl">
          <b>Category: </b>
          {deck?.theme}
        </Text>
        <Text fontSize="2xl">
          {deckSize == 0 || deckSize === undefined ? "Deck is empty" : deckSize}
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

export default Deck
