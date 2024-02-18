import { Body, Controller, Post } from '@nestjs/common'

import { AuthService } from '../services'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() body: any) {
    const response = await this.authService.signIn(body)

    return response
  }
}
