import { RoleTypeEnum } from '../enum'

export class CreateUserDto {
  firstName: string
  lastName: string
  email: string
  password: string
  type: RoleTypeEnum
}
