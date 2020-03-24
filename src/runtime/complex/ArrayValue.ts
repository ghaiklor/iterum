import { Value } from '../Value';
import { ValueKind } from '../ValueKind';

export class ArrayValue extends Value {
  constructor (data: any[]) {
    super(ValueKind.ARRAY, data);
  }
}
