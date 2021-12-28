import { useState } from "react"
import {
  InputGroup,
  Input,
  InputRightElement,
  IconButton
} from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"

interface PasswordInputProps {
  id: string
  placeholder: string
  field: any /* https://github.com/jaredpalmer/formik/issues/2086 */
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  placeholder,
  field
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <InputGroup size="md">
      <Input
        bg="white"
        type={isPasswordVisible ? "text" : "password"}
        id={id}
        placeholder={placeholder}
        {...field}
      />
      <InputRightElement width="4.5rem">
        <IconButton
          size="lg"
          variant="ghost"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          icon={isPasswordVisible ? <ViewOffIcon /> : <ViewIcon />}
          aria-label="Toggle password visibility"
          _focus={{ boxShadow: "none" }}
          _hover={{ background: "none" }}
          _active={{ background: "none" }}
        />
      </InputRightElement>
    </InputGroup>
  )
}

export default PasswordInput
