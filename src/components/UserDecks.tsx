import {
  Flex,
  Box,
  Skeleton,
  HStack,
  Heading,
  Spacer,
  Input,
  Text,
  Button
} from "@chakra-ui/react"
import { useState } from "react"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import { AllDecks } from "../common/types"
import { formatDate, isSameStart } from "../common/utils"
import HttpStatusCode from "../constants/httpStatusCode"
import { DECK } from "../constants/routes"
import CreateDeckButton from "./CreateDeckButton"

const UserDecks = ({
  userId,
  isFromHome
}: {
  userId: number | undefined
  isFromHome?: boolean
}) => {
  const { data, isLoading, isError, refetch } = useQuery<AllDecks, Error>(
    "getAllUserDecks",
    async () => {
      const response = await fetch(`/deck/get_all/${userId}`)
      const data = await response.json()
      if (response.status === HttpStatusCode.OK) {
        console.log(`response=${JSON.stringify(response)}`)
      }
      return data
    }
  )

  console.log(JSON.stringify(data))

  const [deckFilterText, setDeckFilterText] = useState("")
  const handleDeckFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeckFilterText(e.target.value)
  }

  if (isLoading) {
    return (
      <Flex wrap="wrap">
        {[...Array(5).keys()].map((el) => (
          <Box
            key={el}
            bgGradient="linear(to-tr, blue.200, blue.400)"
            border="solid 1px black"
            rounded="xl"
            p="10px"
            m="5px"
            w="375px"
            _hover={{
              bgGradient: "linear(to-tr, blue.300, blue.500)",
              boxShadow: "xl"
            }}
          >
            <Skeleton w="200px" h="30px" mb="5px" />
            <HStack>
              <b>Category:</b>
              <Skeleton w="75px" h="15px" />
            </HStack>

            <HStack>
              <Text>Deck size:</Text> <Skeleton w="75px" h="15px" />
            </HStack>

            <HStack>
              <i>Last updated on</i> <Skeleton w="75px" h="15px" />
            </HStack>
          </Box>
        ))}
      </Flex>
    )
  }

  if (isError) {
    return (
      <Box>
        <Text>
          Oops... It seems an error occured. Click below to try reloading the
          data.
        </Text>
        <Button colorScheme="blue" onClick={() => refetch()}>
          Reload
        </Button>
      </Box>
    )
  }

  const formattedDate = (date: Date | undefined) =>
    formatDate(date, true).split(" ").join(" at ")

  const filteredDecks = data?.decks?.filter(
    (deck) =>
      isSameStart(deck.name, deckFilterText) ||
      isSameStart(deck.theme!, deckFilterText)
  )

  return (
    <>
      <HStack mb="15px">
        <Flex justifyContent="center" alignItems="center">
          <Heading>My decks</Heading>
          <CreateDeckButton userId={userId} isFromHome={isFromHome} />
        </Flex>

        <Spacer />

        <Input
          bg="white"
          w="275px"
          placeholder="Search decks by name or category"
          name="deckFilter"
          value={deckFilterText}
          onChange={handleDeckFilter}
          disabled={data?.count === 0}
        />
      </HStack>

      {filteredDecks!?.length > 0 ? (
        <Flex wrap="wrap">
          {filteredDecks!
            .sort((d1, d2) => {
              if (d1.id > d2.id) return 1
              return -1
            })
            .map((deck, idx) => {
              return (
                <Link key={idx} to={{ pathname: `${DECK}/${deck.id}` }}>
                  <Box
                    bgGradient="linear(to-tr, blue.200, blue.400)"
                    border="solid 1px black"
                    rounded="xl"
                    p="10px"
                    m="5px"
                    _hover={{
                      bgGradient: "linear(to-tr, blue.300, blue.500)",
                      cursor: "pointer",
                      boxShadow: "xl"
                    }}
                  >
                    <Heading size="lg">{deck.name}</Heading>
                    <Text>
                      <b>Category: </b>
                      {deck.theme}
                    </Text>
                    {deck.nb_cards && deck.nb_cards > 0 ? (
                      <Text>
                        <b>Deck size: </b>
                        {deck.nb_cards} card{deck.nb_cards > 1 ? "s" : ""}
                      </Text>
                    ) : (
                      <Text>This deck is empty.</Text>
                    )}
                    <Text>
                      <i>Last updated on {formattedDate(deck?.updated_at)}</i>
                    </Text>
                  </Box>
                </Link>
              )
            })}
        </Flex>
      ) : data?.count === 0 ? (
        <Flex direction="column">
          <Text>You currently don't have a deck.</Text>
          <Text>Why don't you create one?</Text>
        </Flex>
      ) : (
        <Box mt="15px">
          <Text fontSize="large">No deck matches.</Text>
        </Box>
      )}
    </>
  )
}

export default UserDecks
