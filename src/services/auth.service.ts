import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserService } from './user.service'
import { SignInDto } from '../dtos'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.findByEmail(signInDto.email)

    if (!user) throw new UnauthorizedException()

    const isPasswordValid = await this.userService.validatePassword(signInDto.password, user.password)

    if (!isPasswordValid) throw new UnauthorizedException()

    const payload = { email: user.email, sub: user.id }

    return {
      accessToken: this.jwtService.sign(payload),
    }
  }
}
