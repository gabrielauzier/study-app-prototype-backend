import 'dotenv/config'

import { MongoMemoryServer } from 'mongodb-memory-server'

import mongoose from 'mongoose'

const DATABASE_URL_TESTING = 'mongodb://localhost:27017/test-db'

export const generateUniqueDatabaseURL = () => {
  const mongo = new MongoMemoryServer()
  return mongo.getUri()
}

export const connectDatabase = async (URI: string) =>
  mongoose.createConnection(URI)

export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  // await mongo.stop()
}

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections
  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany({})
  }
}

beforeAll(async () => {
  // const databaseURL = generateUniqueDatabaseURL()

  connectDatabase(DATABASE_URL_TESTING)
  process.env.DATABASE_URL = DATABASE_URL_TESTING
})

afterAll(async () => {
  await mongoose.disconnect()
})
