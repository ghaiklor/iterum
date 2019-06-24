import { Value } from "../Value";
import { ValueKind } from "../ValueKind";

export class ArrayValue extends Value {
  // TODO: somehow get rid of any here
  constructor(data: any[]) {
    super(ValueKind.ARRAY, data);
  }
}
