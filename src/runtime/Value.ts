import { ObjectValue } from "./objects/ObjectValue";
import { ValueKind } from "./ValueKind";

export abstract class Value {
  private kind: ValueKind;
  private data: any;
  constructor(kind: ValueKind, data: any) {
    this.kind = kind;
    this.data = data;
  }

  public equals(that: Value): boolean {
    // tslint:disable-next-line: triple-equals
    return this.data == that.data;
  }

  public strictEquals(that: Value): boolean {
    return this.data === that.data;
  }

  public sameValue(that: Value): boolean {
    return this === that;
  }

  public typeOf(): string {
    return ValueKind[this.kind].toLowerCase();
  }

  public instanceOf(that: ObjectValue): boolean {
    if (typeof this.data === "object" && typeof that.data === "object") {
      return this.data.constructor === that.data.constructor;
    }

    return false;
  }

  public is(kind: ValueKind): boolean {
    return this.kind === kind;
  }

  public isNull(): boolean {
    return this.is(ValueKind.NULL);
  }

  public isTrue(): boolean {
    return this.is(ValueKind.BOOLEAN) && this.data === true;
  }

  public isFalse(): boolean {
    return this.is(ValueKind.BOOLEAN) && this.data === false;
  }

  public isString(): boolean {
    return this.is(ValueKind.STRING);
  }

  public isFunction(): boolean {
    return this.is(ValueKind.FUNCTION);
  }

  public isArray(): boolean {
    return this.is(ValueKind.ARRAY);
  }

  public isObject(): boolean {
    return this.is(ValueKind.OBJECT);
  }

  public isBoolean(): boolean {
    return this.is(ValueKind.BOOLEAN);
  }

  public isNumber(): boolean {
    return this.is(ValueKind.NUMBER);
  }

  public isRegExp(): boolean {
    return this.is(ValueKind.REGEXP);
  }

  public toBoolean(): boolean {
    return !!this.data;
  }

  public toNumber(): number {
    // tslint:disable-next-line: no-bitwise
    return this.data | 0;
  }

  public toString(): string {
    return "" + this.data;
  }

  public toObject(): object {
    return this.data;
  }

  public toInteger(): number {
    return parseInt(this.data, 10);
  }
}
