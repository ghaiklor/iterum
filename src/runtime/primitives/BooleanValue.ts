import { ValueKind } from '../ValueKind';
import { PrimitiveValue } from './PrimitiveValue';

export class BooleanValue extends PrimitiveValue {
  constructor (data: boolean) {
    super(ValueKind.BOOLEAN, data);
  }
}
