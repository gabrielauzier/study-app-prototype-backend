import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { TestAppModule } from 'test/setup-e2e'
import { MongooseModule } from '@nestjs/mongoose'
import { MongoUserSchema } from '../../infra/mongodb/schemas/mongo-user-schema'
import { UserFactory } from 'test/factories/make-user'
import { hash } from 'bcryptjs'

import request from 'supertest'

describe('Authenticate user (e2e)', () => {
  let app: INestApplication
  let userFactory: UserFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TestAppModule,
        MongooseModule.forFeature([{ name: 'users', schema: MongoUserSchema }]),
      ],
      providers: [UserFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    userFactory = moduleRef.get(UserFactory)

    await app.init()
  })

  test('should be able to authenticate user and provide an access token', async () => {
    await userFactory.makeMongoUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 8),
    })

    const response = await request(app.getHttpServer())
      .post('/identity/authenticate')
      .send({
        email: 'johndoe@example.com',
        password: '123456',
      })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
  })
})