import mongoose, { Schema, InferSchemaType } from 'mongoose'

export const MongoAttachmentSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
})

export type MongoAttachmentProps = InferSchemaType<typeof MongoAttachmentSchema>

export const MongoAttachmentModel = mongoose.model(
  'attachments',
  MongoAttachmentSchema,
)
