import { RuntimeError } from "../../errors/RuntimeError";
import { Value } from "../Value";
import { ValueKind } from "../ValueKind";
import { ClassValue } from "./ClassValue";

export class InstanceValue extends Value {
  private klass: ClassValue;
  private fields: Map<string, Value> = new Map();
  constructor(klass: ClassValue) {
    super(ValueKind.INSTANCE, klass);

    this.klass = klass;
  }

  public getField(key: string): Value {
    const value = this.fields.get(key);
    if (value === undefined) {
      throw new RuntimeError(RuntimeError.UNDEFINED_PROPERTY, key);
    }

    return value;
  }

  public setField(key: string, value: Value): Value {
    this.fields.set(key, value);
    return value;
  }

  public toString() {
    return `instanceof ${this.klass.toString()}`;
  }
}
