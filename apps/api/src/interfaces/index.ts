// you can import this from any of the apps
// eg; import { SomeInterface } from '../interfaces';
import type { Role, User } from '@prisma/client'

export interface UserById extends User {
  roles?: Role[]
}

export enum UserStatus {
  active = 0,
  inactive = 1,
}

export enum Roles {
  Admin = 'Admin',
  User = 'User',
}
