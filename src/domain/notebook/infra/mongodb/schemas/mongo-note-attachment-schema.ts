import mongoose, { Schema, InferSchemaType } from 'mongoose'

export const MongoNoteAttachmentSchema = new Schema({
  note_id: { type: Schema.Types.ObjectId, required: true },
  attachment_id: { type: Schema.Types.ObjectId, required: true },
})

export type MongoNoteAttachmentProps = InferSchemaType<
  typeof MongoNoteAttachmentSchema
>

export const MongoNoteAttachmentModel = mongoose.model(
  'notes_attachments',
  MongoNoteAttachmentSchema,
)
