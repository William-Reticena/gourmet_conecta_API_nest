import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserController } from '../controllers'
import { UserService } from '../services'

import { Address, Role, User } from '../entities'

@Module({
  imports: [TypeOrmModule.forFeature([Address, Role, User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
