import {
  Text,
  Flex,
  Heading,
  Box,
  Button,
  ButtonGroup,
  Image
} from "@chakra-ui/react"

const Home = () => {
  return (
    <Flex flex="1" direction="column" margin="2" justifyContent="space-evenly">
      <Box p="10px" margin="10px 0" fontSize="2xl">
        <Heading size="3xl" mb="10px">
          Welcome on my flashcards app!
        </Heading>
        <Text>
          Here you can create your own flashcards decks to study any topic of
          your interest.
        </Text>
      </Box>

      <Box
        p="10px"
        border="solid 1px black"
        backgroundColor="gray.100"
        borderRadius="2xl"
        margin="10px 0"
      >
        <Text fontSize="larger">
          <b>
            &#26; <i>But what's a flashcard?</i>
          </b>
        </Text>
        <Text fontSize="large">
          Flashcards are small note cards used for testing and improving memory
          through practiced information retrieval. Flashcards are typically
          two-sided, with the prompt on one side and the information about the
          prompt on the other.
        </Text>
      </Box>
      <Box
        p="10px"
        border="solid 1px black"
        backgroundColor="gray.100"
        borderRadius="2xl"
        margin="10px 0"
        display="flex"
        flexDirection="column"
      >
        <Text fontSize="larger">
          <b>
            &#26; <i>How do I use it?</i>
          </b>
        </Text>
        <Text fontSize="large">
          Create your own deck, or select an already existing one. The study
          process is the following:
        </Text>
        <Box alignSelf="center">
          <Image src="/homelogo-light.png" alt="homepagelogo" />
        </Box>
      </Box>
      <Box
        p="10px"
        border="solid 1px black"
        backgroundColor="gray.100"
        borderRadius="2xl"
        margin="10px 0"
      >
        <Text fontSize="larger">
          <b>
            &#26; <i>How does it work?</i>
          </b>
        </Text>
        <Text fontSize="large">
          Spaced repetition is the process by which new or difficult concepts
          are studied more frequently than easier known concepts —thereby
          perpetually challenging you on your weakest areas of knowledge.
          Cognitive science shows that spacing repetitions within the optimal
          time intervals has actually been shown to be the most important factor
          in your ability to retain knowledge. It is literally how our brains
          are wired to encode memories.
        </Text>
      </Box>

      <Flex direction="column" align="center">
        <Heading size="xl" mb="5px">
          Get started now !
        </Heading>
        <ButtonGroup>
          <Button colorScheme="blue">Create deck</Button>
          <Text alignSelf="center">or</Text>
          <Button colorScheme="blue">Browse decks</Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  )
}

export default Home
