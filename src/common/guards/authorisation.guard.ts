import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { verifySignedData, verifySignedHeader } from '@/common/utils';

@Injectable()
export class AuthorisationGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();

    const publicKey = request.params.publicKey;
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      return false;
    }

    if (
      !verifySignedHeader({
        publicKey,
        header: authorizationHeader,
      })
    ) {
      return false;
    }

    return !!verifySignedData({
      publicKey,
      data: request.body,
      parseJson: true,
    });
  }
}
