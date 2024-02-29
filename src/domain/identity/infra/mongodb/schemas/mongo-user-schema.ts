import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

// import mongoose, { InferSchemaType } from 'mongoose'

// export const MongoUserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
// })

// export type MongoUserProps = InferSchemaType<typeof MongoUserSchema>

// export const MongoUserModel = mongoose.model('users', MongoUserSchema)
// console.log(MongoConnection.getInstance())
// console.log(MongoConnection.getInstance().getConnection())

// export const MongoUserModel = MongoConnection.getInstance()
//   .getConnection()
//   .model('users', MongoUserSchema)

@Schema()
export class MongoUser {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  password: string
}

export const MongoUserSchema = SchemaFactory.createForClass(MongoUser)
export type MongoUserDocument = HydratedDocument<MongoUser>
