import { PaginationParams } from '@/core/repositories/pagination-params'
import { NotesRepository } from '@/domain/notebook/application/repositories/notes-repository'
import { Note } from '@/domain/notebook/enterprise/entities/note'
import { Injectable } from '@nestjs/common'
import { MongoNoteMapper } from '../mappers/mongo-note-mapper'
import { NoteAttachmentsRepository } from '@/domain/notebook/application/repositories/note-attachments-repository'
import { MongooseModel } from '@/core/types/mongo'
import { MongoNoteSchema } from '../schemas/mongo-note-schema'
import { MongoService } from '@/domain/common/infra/database/mongodb/mongo.service'

@Injectable()
export class MongoNotesRepository implements NotesRepository {
  private model: MongooseModel<typeof MongoNoteSchema>

  constructor(
    private noteAttachmentsRepository: NoteAttachmentsRepository,
    private mongo: MongoService,
  ) {
    this.model = mongo.getConnection().model('notes', MongoNoteSchema)
  }

  async findById(id: string): Promise<Note | null> {
    const note = await this.model.findById(id)

    if (!note) {
      return null
    }

    return MongoNoteMapper.toDomain(note)
  }

  async findBySlug(slug: string): Promise<Note | null> {
    const note = await this.model.findOne({ slug })

    if (!note) {
      return null
    }

    return MongoNoteMapper.toDomain(note)
  }

  async findManyRecent(
    authorId: string,
    { registersPerPage = 10 }: PaginationParams,
  ): Promise<Note[]> {
    const notes = await this.model
      .find({ author_id: authorId })
      .sort({
        _id: -1,
      })
      .limit(registersPerPage)

    return MongoNoteMapper.arrayToDomain(notes)
  }

  async save(note: Note): Promise<void> {
    await this.model.findOneAndUpdate(
      { _id: note.id },
      MongoNoteMapper.toMongo(note),
    )

    await this.noteAttachmentsRepository.createMany(
      note.attachments.getNewItems(),
    )

    await this.noteAttachmentsRepository.deleteMany(
      note.attachments.getRemovedItems(),
    )
  }

  async create(note: Note): Promise<void> {
    // const createdNote = await this.model.create(
    //   MongoNoteMapper.toMongo(note),
    // )

    // const _noteAttachments = note.attachments.getItems()

    // const noteAttachments: NoteAttachment[] = _noteAttachments.map((att) => {
    //   return NoteAttachment.create({
    //     attachmentId: att.attachmentId,
    //     noteId: new UniqueEntityID(createdNote._id.toString()),
    //   })
    // })

    // await this.noteAttachmentsRepository.createMany(noteAttachments)

    await this.model.create(MongoNoteMapper.toMongo(note))
  }

  async delete(note: Note): Promise<void> {
    await this.model.deleteOne({ _id: note.id })
  }
}
