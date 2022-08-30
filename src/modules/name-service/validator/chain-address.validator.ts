import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import * as addressValidator from 'multicoin-address-validator';

@ValidatorConstraint({ name: 'chainAddress', async: false })
export class ChainAddress implements ValidatorConstraintInterface {
  validate(address: string, args: ValidationArguments) {
    return addressValidator.validate(address, args.constraints[0]);
  }

  defaultMessage(args: ValidationArguments) {
    return 'UnknownChainAddress';
  }
}
