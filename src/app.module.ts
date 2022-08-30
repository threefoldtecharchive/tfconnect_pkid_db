import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DocumentModule } from './modules/document/document.module';
import { SharedModule } from './modules/shared/shared.module';
import { NameServiceModule } from '@/modules/name-service/name-service.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DocumentModule,
    NameServiceModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
