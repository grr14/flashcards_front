import * as yup from "yup"

export const registerFormValidationSchema = yup.object({
  username: yup
    .string()
    .min(8, "Username should be of minimum 8 characters length")
    .required("Username is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password"), null], "Passwords must match")
})

export const loginFormValidationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required")
})

export const changeEmailFormValidationSchema = yup.object({
  newEmail: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  newEmailConfirmation: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required")
    .oneOf([yup.ref("newEmail"), null], "Emails must match")
})

export const changePasswordFormValidationSchema = yup.object({
  oldPassword: yup.string(),
  newPassword: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  newPasswordConfirmation: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("newPassword"), null], "New passwords must match")
})

export const biographyFormValidationSchema = yup.object({
  biography: yup.string().max(2000, "Maximum 2000 caracters")
})

export const addCardFormValidationSchema = yup.object({
  front: yup
    .string()
    .min(1, "No field must be empty")
    .max(300, "Max length: 300 caracters."),
  back: yup
    .string()
    .min(1, "No field must be empty")
    .max(300, "Max length: 300 caracters.")
})
