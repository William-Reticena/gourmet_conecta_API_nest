import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import dbConfig from '../configurations/db-config'

import { UserModule } from './user.module'

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), UserModule],
})
export class AppModule {}
