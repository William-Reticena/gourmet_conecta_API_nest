import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi'

import { SignInSchema } from '../schemas/sign-in.schema'

@JoiSchemaOptions({})
export class SignInDto {
  @JoiSchema(SignInSchema.email)
  email: string

  @JoiSchema(SignInSchema.password)
  password: string
}
