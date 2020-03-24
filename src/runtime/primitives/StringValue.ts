import { ValueKind } from '../ValueKind';
import { PrimitiveValue } from './PrimitiveValue';

export class StringValue extends PrimitiveValue {
  constructor (data: string) {
    super(ValueKind.STRING, data);
  }
}
