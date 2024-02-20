import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'

import dbConfig from '../configurations/db-config'

import { AuthModule } from './auth.module'
import { RestaurantModule } from './restaurant.module'
import { UserModule } from './user.module'
import { AuthGuard } from '../guards/auth.guard'

@Module({
  imports: [AuthModule, RestaurantModule, UserModule, TypeOrmModule.forRoot(dbConfig)],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
