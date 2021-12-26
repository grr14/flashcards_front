import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  Skeleton,
  Text
} from "@chakra-ui/react"
import React from "react"
import { useQuery } from "react-query"
import { authFetch } from "../auth"
import { User } from "../common/types"

const Profile = () => {
  const { data: user, isLoading } = useQuery<User, Error>(
    "getUsername",
    async () => {
      return await (await authFetch("/api/me")).json()
    }
  )

  if (user === undefined) {
    return <p>YAONG</p>
  }

  const test = true
  if (isLoading) {
    return (
      <Box display="flex" flex="1" margin="2">
        <Flex flex="1">
          <Box
            backgroundColor="gray.300"
            padding="2"
            w="300px"
            borderRadius="xl"
          >
            <Center mb="15px">
              <Avatar size="2xl" />
            </Center>
            {["Username", "Email", "Date joined", "Last login"].map(
              (el, idx) => (
                <React.Fragment key={idx}>
                  <Flex alignItems="center" mb="5px">
                    <Text>
                      <b>{el}:</b>
                    </Text>
                    <Skeleton
                      ml="5px"
                      height="18px"
                      flex="1"
                      startColor="blue.600"
                      endColor="blue.700"
                    />
                  </Flex>
                </React.Fragment>
              )
            )}
          </Box>
          <Box flex="1" backgroundColor="blue.50" display="flex">
            <Box flex="1" border="solid 1px black" ml="10px">
              <Heading>My decks</Heading>
            </Box>
          </Box>
        </Flex>
      </Box>
    )
  }

  return (
    <Box display="flex" flex="1" margin="2">
      <Flex flex="1">
        <Box backgroundColor="gray.300" padding="2" w="300px" borderRadius="xl">
          <Center mb="15px">
            <Avatar size="2xl" />
          </Center>
          <Text>
            <b>Username:</b>
            <Text as="span" ml="5px" height="18px" flex="1">
              {user?.username}
            </Text>
          </Text>
          <Text>
            <b>Email:</b>
            <Text as="span" ml="5px" height="18px" flex="1">
              {user?.email}
            </Text>
          </Text>
          <Text>
            <b>Date joined:</b>
            <Text as="span" ml="5px" height="18px" flex="1">
              {user?.date_joined}
            </Text>
          </Text>
          <Text>
            <b>Last login:</b>
            <Text as="span" ml="5px" height="18px" flex="1">
              {user?.last_login}
            </Text>
          </Text>
        </Box>
        <Box flex="1" backgroundColor="blue.50" display="flex">
          <Box flex="1" border="solid 1px black" ml="10px">
            <Heading>My decks</Heading>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default Profile
