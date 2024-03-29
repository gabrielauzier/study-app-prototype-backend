import { MongooseDocument } from '@/core/types/mongo'
import { MongoNoteAttachmentProps } from '../schemas/mongo-note-attachment-schema'
import { NoteAttachment } from '@/domain/notebook/enterprise/entities/note-attachment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class MongoNoteAttachmentMapper {
  static toDomain(
    doc: MongooseDocument<MongoNoteAttachmentProps>,
  ): NoteAttachment {
    const raw = doc.toObject()

    return NoteAttachment.create({
      attachmentId: new UniqueEntityID(raw.attachment_id.toString()),
      noteId: new UniqueEntityID(raw.note_id.toString()),
    })
  }

  static toMongo(noteAttachment: NoteAttachment): MongoNoteAttachmentProps {
    return {
      attachment_id: noteAttachment.attachmentId.toObjectID(),
      note_id: noteAttachment.noteId.toObjectID(),
    }
  }
}
