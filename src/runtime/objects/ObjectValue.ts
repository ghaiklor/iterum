import { Value } from "../Value";
import { ValueKind } from "../ValueKind";

export class ObjectValue extends Value {
  constructor(data: object) {
    super(ValueKind.OBJECT, data);
  }
}
