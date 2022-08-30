import { ChainTypes } from '@/modules/name-service/enum/chainType.enum';

import { ChainAddress } from '@/modules/name-service/validator/chain-address.validator';
import { Validate } from 'class-validator';

export class Chain {
  @Validate(ChainAddress, ['Stellar'], {
    message: 'InvalidStellarAddress',
  })
  [ChainTypes.STELLAR]: string;
  @Validate(ChainAddress, ['Polkadot'], {
    message: 'InvalidTfChainAddress',
  })
  [ChainTypes.SUBSTRATE]: string;

  constructor(partial: Partial<Chain>) {
    Object.assign(this, partial);
  }
}
