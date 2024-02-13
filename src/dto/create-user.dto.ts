import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi'

import { CreateUserSchema } from '../schemas/create-user.schema'

@JoiSchemaOptions({})
export class CreateUserDto {
  @JoiSchema(CreateUserSchema.firstName)
  firstName: string

  @JoiSchema(CreateUserSchema.lastName)
  lastName: string

  @JoiSchema(CreateUserSchema.email)
  email: string

  @JoiSchema(CreateUserSchema.password)
  password: string

  @JoiSchema(CreateUserSchema.type)
  type: number
}
