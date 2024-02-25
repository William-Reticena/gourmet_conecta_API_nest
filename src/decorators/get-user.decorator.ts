import { ExecutionContext, createParamDecorator } from '@nestjs/common'

import { IUser } from '../interfaces'

export const GetUser = createParamDecorator((_: unknown, ctx: ExecutionContext): IUser => {
  const request = ctx.switchToHttp().getRequest()

  return request.user
})
