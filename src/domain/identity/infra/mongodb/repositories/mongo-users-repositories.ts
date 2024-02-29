import { Student } from '@/domain/notebook/enterprise/entities/student'
import { Injectable } from '@nestjs/common'
import { MongoUserMapper } from '../mappers/mongo-user-mapper'
import { MongoUserSchema } from '../schemas/mongo-user-schema'
import { UsersRepository } from '@/domain/identity/application/repositories/users-repository'
import { MongoService } from '@/domain/common/infra/database/mongodb/mongo.service'
import { MongooseModel } from '@/core/types/mongo'

@Injectable()
export class MongoUsersRepository implements UsersRepository {
  private model: MongooseModel<typeof MongoUserSchema>

  constructor(mongo: MongoService) {
    this.model = mongo.getConnection().model('users', MongoUserSchema)
  }

  async findByEmail(email: string): Promise<Student | null> {
    const student = await this.model.findOne({ email })

    if (!student) {
      return null
    }

    return MongoUserMapper.toDomain(student)
  }

  async create({ name, email, password }: Student): Promise<void> {
    await this.model.create({ name, email, password })
  }
}
