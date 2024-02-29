import { Injectable } from '@nestjs/common'

import { Student } from '@/domain/notebook/enterprise/entities/student'
import { StudentsRepository } from '@/domain/notebook/application/repositories/students-repository'

import { MongoStudentSchema } from '../schemas/mongo-students-schema'
import { MongoStudentMapper } from '../mappers/mongo-student-mapper'
import { MongoService } from '@/domain/common/infra/database/mongodb/mongo.service'
import { MongooseModel } from '@/core/types/mongo'

@Injectable()
export class MongoStudentsRepository implements StudentsRepository {
  private model: MongooseModel<typeof MongoStudentSchema>

  constructor(mongo: MongoService) {
    this.model = mongo.getConnection().model('students', MongoStudentSchema)
  }

  async findByEmail(email: string): Promise<Student | null> {
    const student = await this.model.findOne({ email })

    if (!student) {
      return null
    }

    return MongoStudentMapper.toDomain(student)
  }

  async create({ name, email, password }: Student): Promise<void> {
    await this.model.create({ name, email, password })
  }
}
