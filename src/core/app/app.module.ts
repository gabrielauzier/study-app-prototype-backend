import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '@/domain/auth/auth.module'
import { NotebookModule } from '@/domain/notebook/infra/notebook.module'
import { envSchema } from '../env/env'
import { EnvModule } from '../env/env.module'
import { IdentityModule } from '@/domain/identity/infra/identity.module'
import { MongoModule } from '@/domain/common/infra/database/mongodb/mongo.module'
import { MongooseModule } from '@nestjs/mongoose'
import { EnvService } from '../env/env.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    MongooseModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory(env: EnvService) {
        return { uri: env.get('DATABASE_URL') }
      },
    }),
    MongoModule,
    AuthModule,
    NotebookModule,
    IdentityModule,
  ],
})
export class AppModule {}
