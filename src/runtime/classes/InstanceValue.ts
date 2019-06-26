import { NullValue } from "../primitives/NullValue";
import { Value } from "../Value";
import { ValueKind } from "../ValueKind";
import { ClassValue } from "./ClassValue";
import { ObjectValue } from "./ObjectValue";

export class InstanceValue extends ObjectValue {
  public fields: Map<string, Value> = new Map();
  private klass: ClassValue;
  constructor(klass: ClassValue) {
    super(ValueKind.INSTANCE, null);

    this.klass = klass;
  }

  public getField(key: string): Value {
    const value = this.fields.get(key);
    if (value === undefined) {
      return new NullValue();
    }

    return value;
  }

  public setField(key: string, value: Value): Value {
    this.fields.set(key, value);
    return value;
  }

  public toString() {
    return `<instanceof ${this.klass.toString()}>`;
  }
}
