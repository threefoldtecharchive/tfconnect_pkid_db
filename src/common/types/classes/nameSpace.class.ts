import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Chain } from '@/common/types/classes/chain.class';

export class NameSpace {
  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateNested()
  chains: Chain;

  constructor(partial: Partial<NameSpace>) {
    Object.assign(this, {
      ...partial,
      chains: new Chain(partial.chains),
    });
  }
}

export class NameSpaceValidator {
  @ValidateNested({ each: true })
  public namespaces: NameSpace[];

  constructor(list: NameSpace[]) {
    this.namespaces = list;
  }
}
