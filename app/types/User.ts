//app/types/User.ts

export interface User {
  id: string
  fullName: string
  email: string
  password: string
  phone?: string
  bio?: string
  profilePicture?: string
  profileImageUrl?: string
  gender?: 'male' | 'female' | 'other'
  interests?: string[]
  receiveNewsletter?: boolean
  acceptTerms?: boolean
}
