import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RestaurantController } from '../controllers'
import { RestaurantService } from '../services'
import { UserModule } from './user.module'

import { Address, Dish, Menu, OperationTime, Restaurant } from '../entities'

@Module({
  imports: [TypeOrmModule.forFeature([Address, Dish, Menu, OperationTime, Restaurant]), UserModule],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
