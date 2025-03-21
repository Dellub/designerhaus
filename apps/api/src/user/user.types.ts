import type { AuthJwt } from '../auth/auth.types'
import type { UserById } from '../interfaces'

export interface UserLoginResponse {
  jwt: AuthJwt
  user: UserById
}
