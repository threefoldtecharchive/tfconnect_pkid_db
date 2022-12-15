import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RedisClientType } from '@redis/client';

import { generateDocumentKey } from '@/common/utils';
import { IParam } from '@/common/types';

@Injectable()
export class DocumentService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  public async getDocumentByKey(params: IParam) {
    await this.redisClient.select(1);

    const key = generateDocumentKey(params);

    const doesKeyExist = await this.redisClient.exists(key);
    if (!doesKeyExist) {
      throw new NotFoundException('documentNotFound');
    }

    const document = await this.redisClient.get(key);

    return {
      data: document,
    };
  }

  public async saveDocument(params: IParam, data: string) {
    const key = generateDocumentKey(params);

    try {
      await this.redisClient.set(key, data);
    } catch (e) {
      throw new BadRequestException('couldNotSaveDocument');
    }

    return {
      message: 'success',
    };
  }
}
