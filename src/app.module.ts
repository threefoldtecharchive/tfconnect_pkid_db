import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DocumentModule } from './modules/document/document.module';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DocumentModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
