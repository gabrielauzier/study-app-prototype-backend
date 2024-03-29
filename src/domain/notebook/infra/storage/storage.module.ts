import { Module } from '@nestjs/common'
import { R2Storage } from './r2-storage'
import { EnvModule } from '@/core/env/env.module'
import { Uploader } from '../../application/storage/uploader'

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: Uploader,
      useClass: R2Storage,
    },
  ],
  exports: [Uploader],
})
export class StorageModule {}
