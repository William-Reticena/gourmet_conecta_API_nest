import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserService } from './user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(body: any) {
    const user = await this.userService.findByEmail(body.email)

    if (!user) {
      throw new UnauthorizedException()
    }

    // const isPasswordValid = await this.userService.validatePassword(password, user.password)

    // if (!isPasswordValid) {
    //   return null
    // }

    const payload = { email: user.email, sub: user.id }

    return {
      accessToken: this.jwtService.sign(payload),
    }
  }
}
