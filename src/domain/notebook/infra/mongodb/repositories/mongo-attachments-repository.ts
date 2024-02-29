import { AttachmentsRepository } from '@/domain/notebook/application/repositories/attachments-repository'
import { Attachment } from '@/domain/notebook/enterprise/entities/attachment'
import { MongoAttachmentSchema } from '../schemas/mongo-attachment-schema'
import { MongoAttachmentMapper } from '../mappers/mongo-attachment-mapper'
import { MongooseModel } from '@/core/types/mongo'
import { MongoService } from '@/domain/common/infra/database/mongodb/mongo.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MongoAttachmentsRepository implements AttachmentsRepository {
  private model: MongooseModel<typeof MongoAttachmentSchema>

  constructor(mongo: MongoService) {
    this.model = mongo
      .getConnection()
      .model('attachments', MongoAttachmentSchema)
  }

  async create(attachment: Attachment): Promise<void> {
    await this.model.create(MongoAttachmentMapper.toMongo(attachment))
  }
}
