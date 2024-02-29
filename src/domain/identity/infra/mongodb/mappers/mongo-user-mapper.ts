import { User } from '@/domain/identity/enterprise/entities/user'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { MongooseDocument } from '@/core/types/mongo'
import { MongoUserProps } from '../schemas/mongo-user-schema'

export class MongoUserMapper {
  static toDomain(doc: MongooseDocument<MongoUserProps>): User {
    const raw = doc.toObject()

    return User.create(
      {
        email: raw.email,
        name: raw.name,
        password: raw.password,
      },
      new UniqueEntityID(doc?._id.toString()),
    )
  }
}
