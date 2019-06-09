import { Value } from "../Value";
import { ValueKind } from "../ValueKind";

export class NullValue extends Value {
  constructor() {
    super(ValueKind.NULL, null);
  }
}
