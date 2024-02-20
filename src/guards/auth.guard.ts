import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler())

    if (isPublic) return true

    const request = context.switchToHttp().getRequest()

    const authHeader = String(request.headers.authorization)

    if (!authHeader) return false

    const token = this.extractTokenFromHeader(authHeader)

    if (!token) throw new UnauthorizedException()

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

  private extractTokenFromHeader(authHeader: string) {
    const [bearer, token] = authHeader.split(' ')

    return bearer === 'Bearer' ? token : null
  }
}
