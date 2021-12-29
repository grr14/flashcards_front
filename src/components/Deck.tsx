import { Heading } from "@chakra-ui/react"
import { useParams } from "react-router-dom"

const Deck = () => {
  const params = useParams()
  const { id } = params
  return <Heading fontSize="2xl">{id}</Heading>
}

export default Deck
