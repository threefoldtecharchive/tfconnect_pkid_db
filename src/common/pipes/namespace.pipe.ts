import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class NamespacePipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    return `${value}.3bot`;
  }
}
