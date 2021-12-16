export type Only<T, U> = {
  [P in keyof T]: T[P]
} & {
  [P in keyof U]?: never
}

export type Either<T, U> = Only<T, U> | Only<U, T>

export type AccessToken = string
export type RefreshToken = string

export type Session = {
  access_token: AccessToken
  refresh_token?: RefreshToken
}
export type LoginError = {
  error: String
  message: string
  status_code: number
}
export type Role = "admin" | "user"

export type User = {
  id: number
  username: string
  password: string
  email?: string
  is_active?: boolean
  last_login?: Date
  date_joined?: Date
  roles?: Role
}

export type RegisterFormValues = {
  username: string
  email: string
  password: string
  passwordConfirmation: string
}
