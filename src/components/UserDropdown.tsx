import {
  Button,
  Text,
  MenuButton,
  MenuItem,
  MenuList,
  Menu,
  MenuDivider,
  Avatar,
  HStack,
  Box
} from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"

const UserDropdown = ({ username }: { username: string | undefined }) => {
  return (
    <Menu>
      <MenuButton as={Button}>My account</MenuButton>
      <MenuList>
        <HStack p="3px 12.8px">
          <Avatar />
          <Text fontSize="lg">Hello {username || "..."}</Text>
        </HStack>
        <MenuDivider />
        <MenuItem display="flex">
          <Box as={RouterLink} flex="1" to={{ pathname: "/profile" }}>
            Profile
          </Box>
        </MenuItem>
        <MenuItem as="a" href={"/settings"}>
          Settings
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default UserDropdown
