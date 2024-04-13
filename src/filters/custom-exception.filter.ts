import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common'
import { Response } from 'express'

@Catch(Error)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(
    error: any,
    //  Error & {
    //   status: number
    //   cause?: string
    //   response?: { message: string[]; error: string; statusCode: number }
    // },
    host: ArgumentsHost,
  ) {
    const res = host.switchToHttp().getResponse<Response>()

    console.log('error', error)
    console.log('host', host)
    console.log('res', res)

    // if (error.name !== 'QueryFailedError') {
    //   response.status(error.status).json({
    //     developerMessage: error.response && error.response.message ? { ...error.response } : error.message,
    //     userMessage: error?.cause,
    //     status: error.status,
    //   })
    // } else {
    //   Logger.error(error.message)

    //   response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    //     developerMessage: 'Internal server error',
    //     userMessage: 'Erro interno do servidor',
    //     status: HttpStatus.INTERNAL_SERVER_ERROR,
    //   })
    // }
  }
}
