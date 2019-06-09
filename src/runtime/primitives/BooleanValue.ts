import { Value } from "../Value";
import { ValueKind } from "../ValueKind";

export class BooleanValue extends Value {
  constructor(data: boolean) {
    super(ValueKind.BOOLEAN, data);
  }
}
