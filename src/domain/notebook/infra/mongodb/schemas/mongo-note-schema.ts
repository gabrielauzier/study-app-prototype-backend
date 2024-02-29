import { Schema, InferSchemaType, Types } from 'mongoose'

export const MongoNoteSchema = new Schema({
  author_id: { type: Schema.Types.ObjectId, required: true },
  attachments_ids: { type: Array<Types.ObjectId>, required: false },
  title: { type: String, required: true },
  content: { type: String, required: true },
  slug: { type: String, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: false },
})

export type MongoNoteProps = Omit<
  InferSchemaType<typeof MongoNoteSchema>,
  'attachments_ids'
> & { attachments_ids: Types.ObjectId[] }
