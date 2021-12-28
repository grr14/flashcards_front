import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Skeleton,
  Text,
  Textarea
} from "@chakra-ui/react"
import { Field, Form, Formik, FormikState } from "formik"
import React from "react"
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery
} from "react-query"
import { Link } from "react-router-dom"
import { authFetch } from "../auth"
import { BiographyFormValues, User } from "../common/types"
import { biographyFormValidationSchema } from "../constants/form"
import { SETTINGS } from "../constants/routes"

const Profile = () => {
  const {
    data: user,
    isLoading,
    refetch
  } = useQuery<User, Error>("getUsername", async () => {
    return await (await authFetch("/api/me")).json()
  })

  if (isLoading) {
    return (
      <Box display="flex" flex="1" m="2">
        <Flex flex="1">
          <Box bg="gray.300" p="2" w="300px" borderRadius="xl">
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
          <Box flex="1" bg="gray.50" display="flex">
            <Box flex="1" border="solid 1px black" ml="10px">
              <Heading>My decks</Heading>
            </Box>
          </Box>
        </Flex>
      </Box>
    )
  }

  return (
    <Flex flex="1" m="2">
      <Flex
        direction="column"
        bg="gray.300"
        p="2"
        borderRadius="xl"
        justify="space-between"
      >
        <Box>
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

        <Box as={Link} to={{ pathname: SETTINGS }} alignSelf="center" mb="15px">
          <Button colorScheme="blue">Edit my settings</Button>
        </Box>
      </Flex>
      <Box flex="1" bg="gray.50" display="flex">
        <Box flex="1" ml="10px" display="flex" flexDirection="column">
          <Biography
            username={user?.username}
            biography={user?.biography}
            refetch={refetch}
          />
          <Box
            border="solid 1px black"
            borderRadius="xl"
            p="10px"
            bg="gray.100"
            flex="1"
          >
            <Heading>My decks</Heading>
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}

interface BiographyProps {
  username: string | undefined
  biography: string | undefined
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<User, Error>>
}

const Biography = ({ username, biography, refetch }: BiographyProps) => {
  const onSubmitBiography = async (
    values: BiographyFormValues,
    resetForm: (
      nextState?: Partial<FormikState<BiographyFormValues>> | undefined
    ) => void
  ) => {
    const { biography } = values
    const response = await fetch(`/api/biography`, {
      method: "put",
      body: JSON.stringify({
        username,
        biography
      })
    })

    if (response.ok) {
      resetForm()
      refetch()
    }
  }
  return (
    <Box
      border="solid 1px black"
      borderRadius="xl"
      p="10px"
      mb="10px"
      bg="gray.100"
    >
      <Heading>Biography</Heading>
      <Box p="5px 0" mb="10px">
        <Text>
          {biography ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus dignissim sem nec imperdiet. Pellentesque sem turpis, feugiat finibus semper at, tempus quis odio. Mauris sagittis mi quis varius rutrum. Nam id lorem pharetra, viverra diam a, venenatis lectus. Pellentesque sed laoreet nisi. Donec ut libero eu ex rhoncus tincidunt et nec mi. Donec ut ante et eros viverra ullamcorper ac eget enim. Phasellus elementum felis sed ligula viverra blandit. Morbi vel leo id elit suscipit mollis. Praesent tincidunt consectetur rhoncus. Curabitur in sapien vel dui posuere dapibus. Nullam ligula ligula, pharetra ornare mi a, lacinia ultrices velit. Sed nec sem ornare arcu ornare fermentum. Ut ut pellentesque lorem. Integer scelerisque efficitur lectus, non malesuada arcu commodo sed. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras rhoncus iaculis est at dignissim. Integer dictum lobortis tortor, sit amet mattis ligula volutpat at. Pellentesque ac rutrum lorem. Cras ut lobortis eros. In malesuada vitae diam quis porta. Etiam sagittis convallis quam, quis porttitor odio tempus eget. Aliquam rhoncus viverra mattis. In dictum enim sed dui mollis venenatis. Vestibulum sit amet dolor est. Suspendisse pharetra ac erat sed volutpat. Nam in turpis eget mauris convallis vulputate. Vestibulum porttitor feugiat felis in pretium. Donec sed tincidunt neque. Nulla rutrum tempor enim. Sed diam massa, malesuada vitae maximus a, tristique et erat."}
        </Text>
      </Box>
      <Formik
        initialValues={{ biography: "" }}
        validationSchema={biographyFormValidationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmitBiography(values, resetForm)
        }}
      >
        {() => (
          <Form>
            <Field name="biography">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.biography && form.touched.biography}
                  mb={15}
                >
                  <FormLabel htmlFor="biography">Edit my biography</FormLabel>
                  <Textarea
                    {...field}
                    id="biography"
                    placeholder="Tell us about yourself..."
                    bg="white"
                  />
                  <FormErrorMessage>{form.errors.biography}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button type="submit" colorScheme="blue" mr={5}>
              Save changes
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default Profile
