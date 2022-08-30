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

    const namespaceData = verifiedSignedData.map(
      (namespace: NameSpace) => new NameSpace(namespace),
    );

    const validation = await validate(new NameSpaceValidator(namespaceData));

    // Find the cause of the error within the nested array of namespaces
    if (validation.length > 0) {
      const errors = [];
      validation.forEach((validation) =>
        validation.children.forEach((child) => {
          child.children.forEach((subChild) => {
            subChild.children.forEach(({ constraints }) => {
              errors.push({
                [child.value.name]: Object.values(constraints),
              });
            });
          });
        }),
      );
      throw new BadRequestException(errors, 'validationFailed');
    }

    request.publicKey = publicKey;
    return !!verifiedSignedData;
  }
}
