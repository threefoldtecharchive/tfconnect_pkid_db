import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisClientType } from '@redis/client';
import axios, { AxiosError } from 'axios';

import { generateDocumentKey, verifySignedData } from '@/common/utils';
import { IAccount, IParam } from '@/common/types';

@Injectable()
export class NameService {
  constructor(
    private readonly configService: ConfigService,
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  public async getWallets(nameSpace: string): Promise<{ data: string }> {
    const namespaceData = await this.getAccountDetails(nameSpace);

    if (namespaceData?.doublename.localeCompare(nameSpace, undefined, { sensitivity: 'base' }) === 0) {
      throw new BadRequestException('invalidNamespace');
    }

    const namespaceKey = generateDocumentKey({
      publicKey: Buffer.from(namespaceData.publicKey, 'base64').toString('hex'),
      documentKey: nameSpace,
    });

    const doesKeyExist = await this.redisClient.exists(namespaceKey);
    if (!doesKeyExist) {
      throw new NotFoundException('namespaceNotFound');
    }

    const namespace = await this.redisClient.get(namespaceKey);

    const verifiedSignedData = verifySignedData({
      data: namespace,
      publicKey: Buffer.from(namespaceData.publicKey, 'base64').toString('hex'),
      parseJson: true,
    });

    return {
      data: JSON.parse(namespace),
    };
  }

  public async updateNamespace(params: IParam, data: string) {
    const namespaceKey = generateDocumentKey(params);

    try {
      await this.redisClient.set(namespaceKey, data);
    } catch (e) {
      throw new BadRequestException('couldNotSaveDocument');
    }

    return {
      message: 'success',
    };
  }

  public async getAccountDetails(account: string): Promise<IAccount> {
    try {
      return (
        await axios.get(
          `${this.configService.get<string>(
            'AUTH_BACKEND_URL',
          )}/users/${account}`,
        )
      )?.data;
    } catch (e) {
      const error = e as AxiosError;

      if (error.status === '404') {
        throw new NotFoundException('accountNotFound');
      }
    }
  }
}
