import { Value } from "../Value";
import { ValueKind } from "../ValueKind";

export class StringValue extends Value {
  constructor(data: string) {
    super(ValueKind.STRING, data);
  }
}
