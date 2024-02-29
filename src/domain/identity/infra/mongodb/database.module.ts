import { Module } from '@nestjs/common'
import { UsersRepository } from '../../application/repositories/users-repository'
import { MongoUsersRepository } from './repositories/mongo-users-repositories'

import { MongooseModule } from '@nestjs/mongoose'
import { MongoUserSchema } from './schemas/mongo-user-schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: MongoUserSchema }]),
  ],
  providers: [
    {
      provide: UsersRepository,
      useClass: MongoUsersRepository,
    },
  ],
  exports: [UsersRepository],
})
export class DatabaseModule {}
