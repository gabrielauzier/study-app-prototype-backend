import { Module } from '@nestjs/common'
import { StudentsRepository } from '../../application/repositories/students-repository'
import { MongoStudentsRepository } from './repositories/mongo-students-repository'
import { NotesRepository } from '../../application/repositories/notes-repository'
import { MongoNotesRepository } from './repositories/mongo-notes-repository'
import { AttachmentsRepository } from '../../application/repositories/attachments-repository'
import { MongoAttachmentsRepository } from './repositories/mongo-attachments-repository'
import { NoteAttachmentsRepository } from '../../application/repositories/note-attachments-repository'
import { MongoNoteAttachmentsRepository } from './repositories/mongo-note-attachments-repository'
import { MongoModule } from '@/domain/common/infra/database/mongodb/mongo.module'

@Module({
  imports: [MongoModule],
  providers: [
    {
      provide: StudentsRepository,
      useClass: MongoStudentsRepository,
    },
    {
      provide: NotesRepository,
      useClass: MongoNotesRepository,
    },
    {
      provide: AttachmentsRepository,
      useClass: MongoAttachmentsRepository,
    },
    {
      provide: NoteAttachmentsRepository,
      useClass: MongoNoteAttachmentsRepository,
    },
  ],
  exports: [
    StudentsRepository,
    NotesRepository,
    AttachmentsRepository,
    NoteAttachmentsRepository,
  ],
})
export class DatabaseModule {}
