import { InferSchemaType, Schema } from 'mongoose'

export const MongoStudentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
})

export type MongoStudentProps = InferSchemaType<typeof MongoStudentSchema>
