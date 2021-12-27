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
import { PROFILE, SETTINGS } from "../constants/routes"

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
          <Box as={RouterLink} flex="1" to={{ pathname: PROFILE }}>
            Profile
          </Box>
        </MenuItem>
        <MenuItem>
          <Box as={RouterLink} flex="1" to={{ pathname: SETTINGS }}>
            Settings
          </Box>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default UserDropdown
