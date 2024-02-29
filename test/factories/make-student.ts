import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Student,
  StudentProps,
} from '@/domain/notebook/enterprise/entities/student'
import { Injectable } from '@nestjs/common'
import { MongoService } from '@/domain/common/infra/database/mongodb/mongo.service'
import { MongooseModel } from '@/core/types/mongo'
import { MongoStudentSchema } from '@/domain/notebook/infra/mongodb/schemas/mongo-students-schema'

export function makeStudent(
  override: Partial<StudentProps> = {},
  id?: UniqueEntityID,
) {
  const student = Student.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return student
}

@Injectable()
export class StudentFactory {
  private model: MongooseModel<typeof MongoStudentSchema>

  constructor(mongo: MongoService) {
    this.model = mongo.getConnection().model('students', MongoStudentSchema)
  }

  async makeMongoStudent(data: Partial<StudentProps> = {}): Promise<Student> {
    const student = makeStudent(data)

    await this.model.create(data)

    return student
  }
}
