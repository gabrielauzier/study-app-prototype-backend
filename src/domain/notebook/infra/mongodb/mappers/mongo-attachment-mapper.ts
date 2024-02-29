import { Attachment } from '@/domain/notebook/enterprise/entities/attachment'
import { MongoAttachmentProps } from '../schemas/mongo-attachment-schema'

export class MongoAttachmentMapper {
  static toMongo(attachment: Attachment): MongoAttachmentProps {
    return {
      title: attachment.title,
      url: attachment.url,
    }
  }
}
