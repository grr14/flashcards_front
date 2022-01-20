import { Flex } from "@chakra-ui/react"
import React from "react"
import { Deck } from "../common/types"
import CardEdit from "./CardEdit"
import CreateCardButton from "./CreateCardButton"

const EditDeck = ({ deck }: { deck: Deck | undefined }) => (
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

export default EditDeck
