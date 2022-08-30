import { Module } from '@nestjs/common';
import { NameServiceController } from './name-service.controller';
import { NameService } from './name-service.service';

import { RedisModule } from '@/modules/shared/redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [NameServiceController],
  providers: [NameService],
})
export class NameServiceModule {}
