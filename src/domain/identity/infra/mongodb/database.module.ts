import { Module } from '@nestjs/common'
import { UsersRepository } from '../../application/repositories/users-repository'
import { MongoUsersRepository } from './repositories/mongo-users-repositories'

import { MongoModule } from '@/domain/common/infra/database/mongodb/mongo.module'

@Module({
  imports: [MongoModule],
  providers: [
    {
      provide: UsersRepository,
      useClass: MongoUsersRepository,
    },
  ],
  exports: [UsersRepository],
})
export class DatabaseModule {}
