import { Value } from "../Value";
import { ValueKind } from "../ValueKind";

export class NumberValue extends Value {
  constructor(data: number) {
    super(ValueKind.NUMBER, data);
  }
}
