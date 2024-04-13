import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'

import dbConfig from '../configurations/db-config'

import { AuthModule } from './auth.module'
import { RestaurantModule } from './restaurant.module'
import { UserModule } from './user.module'
// import { CustomExceptionFilter } from '../filters'
import { AuthGuard } from '../guards'

@Module({
  imports: [AuthModule, RestaurantModule, UserModule, TypeOrmModule.forRoot(dbConfig)],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: CustomExceptionFilter,
    // },
  ],
})
export class AppModule {}
