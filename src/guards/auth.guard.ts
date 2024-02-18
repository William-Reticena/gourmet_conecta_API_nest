import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    // private readonly userService: UserService,
  ) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()

    const authHeader = request.headers.authorization

    if (!authHeader) {
      return false
    }

    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      })

      request.user = payload
    } catch (e) {
      throw new UnauthorizedException()
    }

    return true
  }

  private extractTokenFromHeader(request: Request) {
    const [bearer, token] = request.headers.authorization.split(' ')

    return bearer === 'Bearer' ? token : null
  }
}
