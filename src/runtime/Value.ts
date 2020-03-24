import { ValueKind } from './ValueKind';

export abstract class Value {
  public data: any;
  private readonly kind: ValueKind;
  constructor (kind: ValueKind, data: any) {
    this.kind = kind;
    this.data = data;
  }

  public equals (that: Value): boolean {
    // eslint-disable-next-line eqeqeq
    return this.data == that.data;
  }

  public strictEquals (that: Value): boolean {
    return this.data === that.data;
  }

  public sameValue (that: Value): boolean {
    return this === that;
  }

  public typeOf (): string {
    return ValueKind[this.kind].toLowerCase();
  }

  public instanceOf (that: Value): boolean {
    if (this.typeOf() === 'object' && that.typeOf() === 'object') {
      return this.data.constructor === that.data.constructor;
    }

    return false;
  }

  public is (kind: ValueKind): boolean {
    return this.kind === kind;
  }

  public isNull (): boolean {
    return this.is(ValueKind.NULL);
  }

  public isTrue (): boolean {
    return this.is(ValueKind.BOOLEAN) && this.data === true;
  }

  public isFalse (): boolean {
    return this.is(ValueKind.BOOLEAN) && this.data === false;
  }

  public isString (): boolean {
    return this.is(ValueKind.STRING);
  }

  public isFunction (): boolean {
    return this.is(ValueKind.FUNCTION);
  }

  public isArray (): boolean {
    return this.is(ValueKind.ARRAY);
  }

  public isObject (): boolean {
    return this.is(ValueKind.OBJECT);
  }

  public isClass (): boolean {
    return this.is(ValueKind.CLASS);
  }

  public isInstance (): boolean {
    return this.is(ValueKind.INSTANCE);
  }

  public isBoolean (): boolean {
    return this.is(ValueKind.BOOLEAN);
  }

  public isNumber (): boolean {
    return this.is(ValueKind.NUMBER);
  }

  public isRegExp (): boolean {
    return this.is(ValueKind.REGEXP);
  }

  public toBoolean (): boolean {
    return !!(this.data as boolean);
  }

  public toNumber (): number {
    // tslint:disable-next-line: no-bitwise
    return this.data | 0;
  }

  public toString (): string {
    return `${String(this.data)}`;
  }

  public toObject (): object {
    return this.data;
  }

  public toInteger (): number {
    return parseInt(this.data, 10);
  }

  public plus (that: Value): number {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.data + that.data;
  }

  public minus (that: Value): number {
    return this.data - that.data;
  }

  public multiply (that: Value): number {
    return this.data * that.data;
  }

  public exponentiation (that: Value): number {
    return Math.pow(this.data, that.data);
  }

  public divide (that: Value): number {
    return this.data / that.data;
  }

  public modulus (that: Value): number {
    return this.data % that.data;
  }

  public bitwiseShiftToLeft (that: Value): number {
    // tslint:disable-next-line: no-bitwise
    return this.data << that.data;
  }

  public bitwiseShiftToRight (that: Value): number {
    // tslint:disable-next-line: no-bitwise
    return this.data >> that.data;
  }

  public bitwiseLogicalShiftToRight (that: Value): number {
    // tslint:disable-next-line: no-bitwise
    return this.data >>> that.data;
  }

  public bitwiseOr (that: Value): number {
    // tslint:disable-next-line: no-bitwise
    return this.data | that.data;
  }

  public bitwiseXor (that: Value): number {
    // tslint:disable-next-line: no-bitwise
    return this.data ^ that.data;
  }

  public bitwiseAnd (that: Value): number {
    // tslint:disable-next-line: no-bitwise
    return this.data & that.data;
  }

  public lessThan (that: Value): boolean {
    return this.data < that.data;
  }

  public greaterThan (that: Value): boolean {
    return this.data > that.data;
  }

  public in (that: Value): boolean {
    return this.data in that.data;
  }
}
