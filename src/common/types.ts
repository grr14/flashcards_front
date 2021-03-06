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
  message: string
  status_code: number
}
export type Role = "admin" | "user"

export type User = {
  id: number
  username: string
  password?: string
  email?: string
  is_active?: boolean
  last_login?: Date
  date_joined?: Date
  roles?: Role
  biography?: string
}

export type RegisterFormValues = {
  username: string
  email: string
  password: string
  passwordConfirmation: string
}

export type LoginFormValues = {
  username: string
  password: string
}

export type ChangeEmailFormValues = {
  newEmail: string
  newEmailConfirmation: string
}

export type ChangePasswordFormValues = {
  oldPassword: string
  newPassword: string
  newPasswordConfirmation: string
}

export type BiographyFormValues = {
  biography: string
}

export type Card = {
  id: string
  front: string
  back: string
  review: number
  is_active: boolean
}

export type Deck = {
  id: number
  creatorId: number
  name: string
  theme?: string
  is_public: boolean
  created_at?: Date
  updated_at?: Date
  nb_cards?: number
  cards?: Card[]
}

export type AllDecks = {
  count: number
  decks: Deck[]
}

export type AddCardFormValues = {
  front: string
  back: string
}

export type CreateDeckFormValues = {
  name: string
  theme: string
  isPublic: boolean
}

const answerTypes = ["correct", "hesitant", "wrong"] as const
export type AnswerType = typeof answerTypes[number]

export type AnswerTypesCounter = {
  [key in AnswerType]: number
}
