import { ValueKind } from '../ValueKind';
import { PrimitiveValue } from './PrimitiveValue';

export class NullValue extends PrimitiveValue {
  constructor () {
    super(ValueKind.NULL, null);
  }
}
