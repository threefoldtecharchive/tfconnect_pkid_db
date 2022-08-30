import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validate } from 'class-validator';

import { NameSpace, NameSpaceValidator } from '@/common/types';
import { NameService } from '@/modules/name-service/name-service.service';
import { verifySignedData } from '../utils';

@Injectable()
export class NamespaceGuard implements CanActivate {
  constructor(private readonly namespaceService: NameService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();

    const namespace = `${request.params.nameSpace}.3bot`;

    const namespaceDetails = await this.namespaceService.getAccountDetails(
      namespace,
    );

    if (!namespaceDetails) {
      throw new NotFoundException('namespaceNotFound');
    }

    const publicKey = Buffer.from(
      namespaceDetails.publicKey,
      'base64',
    ).toString('hex');

    const verifiedSignedData = verifySignedData<NameSpace[]>({
      publicKey,
      data: request.body,
      parseJson: true,
    });

    request.publicKey = publicKey;
    return !!verifiedSignedData;
  }
}
