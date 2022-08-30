import { Module } from '@nestjs/common';

import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { RedisModule } from '../shared/redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
