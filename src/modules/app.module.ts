import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import dbConfig from '../configurations/db-config'

import { RestaurantModule } from './restaurant.module'
import { UserModule } from './user.module'

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), RestaurantModule, UserModule],
})
export class AppModule {}
