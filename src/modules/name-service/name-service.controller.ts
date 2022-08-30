import {
  Controller,
  Get,
  Req,
  Param,
  Put,
  UseGuards,
  Body,
} from '@nestjs/common';

import { NameService } from './name-service.service';

import { NamespaceGuard } from '@/common/guards';
import { NamespacePipe } from '@/common/pipes';

@Controller('/name-service')
export class NameServiceController {
  constructor(private readonly nameService: NameService) {}

  @Get('/:nameSpace')
  getDocument(
    @Req() req,
    @Param('nameSpace', NamespacePipe) nameSpace: string,
  ) {
    return this.nameService.getWallets(nameSpace);
  }

  @UseGuards(NamespaceGuard)
  @Put('/:nameSpace')
  saveAccountNameSpace(
    @Req() req,
    @Param('nameSpace', NamespacePipe) nameSpace: string,
    @Body() body: string,
  ) {
    return this.nameService.updateNamespace(
      {
        publicKey: req.publicKey,
        documentKey: nameSpace,
      },
      body,
    );
  }
}
