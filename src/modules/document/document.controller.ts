import {
  Controller,
  Get,
  Req,
  Param,
  Put,
  UseGuards,
  Body,
} from '@nestjs/common';

import { AuthorisationGuard } from '@/common/guards';
import { IParam } from '@/common/types';

import { DocumentService } from './document.service';

@Controller('/documents/:publicKey/:documentKey')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get('/')
  getDocument(@Req() req, @Param() params: IParam) {
    return this.documentService.getDocumentByKey(params);
  }

  @UseGuards(AuthorisationGuard)
  @Put('/')
  saveDocument(@Req() req, @Param() params: IParam, @Body() body: string) {
    return this.documentService.saveDocument(params, body);
  }
}
