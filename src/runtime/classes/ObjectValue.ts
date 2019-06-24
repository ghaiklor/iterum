import { Value } from "../Value";

export abstract class ObjectValue extends Value {
  public abstract getField(key: string): Value;
  public abstract setField(key: string, value: Value): Value;
}
