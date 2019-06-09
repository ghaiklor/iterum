import { Value } from "../Value";
import { ValueKind } from "../ValueKind";

export class ArrayValue extends Value {
  constructor(data: Value[]) {
    super(ValueKind.ARRAY, data);
  }
}
