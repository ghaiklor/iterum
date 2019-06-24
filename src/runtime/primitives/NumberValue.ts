import { ValueKind } from "../ValueKind";
import { PrimitiveValue } from "./PrimitiveValue";

export class NumberValue extends PrimitiveValue {
  constructor(data: number) {
    super(ValueKind.NUMBER, data);
  }
}
