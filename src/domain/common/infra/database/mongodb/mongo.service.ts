import { EnvService } from '@/core/env/env.service'
import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common'
import mongoose from 'mongoose'

@Injectable()
export class MongoService implements OnModuleDestroy {
  private connection: mongoose.Connection

  constructor(private envService: EnvService) {
    const URI = this.envService.get('DATABASE_URL')
    const homologURI = this.envService.get('HOMOLOG_DATABASE_URL')

    const nodeEnv = this.envService.get('NODE_ENV')

    this.connection = mongoose.createConnection(
      nodeEnv === 'test' ? homologURI : URI,
    )

    Logger.debug(`Mongo Connected @ ${URI}`, 'MongoService')
  }

  onModuleDestroy() {
    return mongoose.disconnect()
  }

  getConnection() {
    return this.connection
  }
}
