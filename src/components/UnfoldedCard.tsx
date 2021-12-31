import { CheckIcon, DeleteIcon, EditIcon, SunIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  HStack,
  IconButton,
  Input,
  Spacer,
  Text
} from "@chakra-ui/react"
import { useRef, useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { useOutsideAlerter } from "../common/hooks"
import { Card } from "../common/types"

const UnfoldedCard = ({ card }: { card: Card }) => {
  /* on Edit mode, we display forms to change the card content */
  const [isEdit, setIsEdit] = useState(false)

  const [cardContent, setCardContent] = useState<Partial<Card>>({
    front: "",
    back: ""
  })

  const handleCardContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardContent({
      ...cardContent,
      [e.target.name]: e.target.value
    })
  }

  const queryClient = useQueryClient()
  const updateCard = useMutation(
    async (c: Partial<Card>) => {
      return await (
        await fetch(`/card/edit/${card?.id}`, {
          method: "put",
          body: JSON.stringify({ front: c.front, back: c.back })
        })
      ).json()
    },
    {
      onSuccess: () => {
        /* close the card */
        setIsEdit(false)
        /* this refetches the deck for faster UI update */
        queryClient.invalidateQueries("getDeckById")
      }
    }
  )

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    updateCard.mutate(cardContent)
  }

  /* close Card when click outside of it */
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, setIsEdit)

  /* focus the input element on edit */
  const [frontIsFocused, setFrontIsFocused] = useState(true)

  return (
    <Flex direction="column">
      <Box
        boxShadow="md"
        rounded="xl"
        bg={"blue.100"}
        m="5px"
        minW="240px"
        minH="240px"
        overflow="hidden"
        ref={wrapperRef}
        transform={isEdit ? "scale(1.5)" : "none"}
        filter={card?.is_active ? "grayscale(0%)" : "grayscale(100%)"}
        transition="transform 0.2s ease-in"
        zIndex={isEdit ? 5 : 0}
        onClick={() => setIsEdit(true)}
        _hover={{
          cursor: "pointer"
        }}
      >
        <FormControl w="100%" h="100%">
          <Flex direction="column" w="100%" h="100%">
            <Flex direction="column" display="flex" flex="1">
              <HStack>
                <Text
                  w="min-content"
                  bg="blue.600"
                  color="white"
                  borderRadius="0 0 90%"
                  p="5px 100px 5px 15px"
                >
                  <i>Front</i>
                </Text>
                <Spacer />
                {isEdit && (
                  <IconButton
                    h="2em"
                    position="absolute"
                    top="10px"
                    right="10px"
                    aria-label="Save changes"
                    colorScheme="green"
                    icon={<CheckIcon />}
                    type="submit"
                    onClick={handleSubmit}
                  />
                )}
              </HStack>

              <Box
                flex="1"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {isEdit ? (
                  <Input
                    bg="white"
                    ml="10px"
                    mr="10px"
                    value={cardContent.front}
                    placeholder={card?.front}
                    name="front"
                    onChange={handleCardContentChange}
                    onFocus={() => setFrontIsFocused(true)}
                    onBlur={() => setFrontIsFocused(false)}
                    ref={(input) => input && frontIsFocused && input.focus()}
                  />
                ) : (
                  <Text fontSize="xl">{card.front}</Text>
                )}
              </Box>
            </Flex>

            <Divider
              bg="blue.600"
              variant="solid"
              h="2px"
              orientation="horizontal"
              mb="-3.5px"
              zIndex="initial"
            />

            <Flex direction="column" display="flex" flex="1">
              <Text
                w="min-content"
                bg="blue.600"
                color="white"
                borderRadius="0 0 90%"
                p="5px 100px 5px 15px"
                zIndex="1"
              >
                <i>Back</i>
              </Text>
              <Box
                flex="1"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {isEdit ? (
                  <Input
                    bg="white"
                    ml="10px"
                    mr="10px"
                    value={cardContent.back}
                    placeholder={card?.back}
                    name="back"
                    onChange={handleCardContentChange}
                  />
                ) : (
                  <Text fontSize="xl">{card.back}</Text>
                )}
              </Box>
            </Flex>
          </Flex>
        </FormControl>
      </Box>
      <Box
        bg="yellow.300"
        border="solid 1px black"
        rounded="3xl"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <IconButton aria-label="Desactivate card" icon={<SunIcon />} />
        <IconButton aria-label="Delete card" icon={<DeleteIcon />} />
      </Box>
    </Flex>
  )
}

export default UnfoldedCard
