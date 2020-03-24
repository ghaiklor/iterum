import { NumberValue } from '../../src/runtime/primitives/NumberValue';

describe('Iterum::Runtime::Value', () => {
  it('Should properly check if values are the same', () => {
    const firstValue = new NumberValue(10);
    const secondValue = new NumberValue(20);
    const thirdValue = new NumberValue(10);

    expect(firstValue.sameValue(firstValue)).toBeTruthy();
    expect(firstValue.sameValue(secondValue)).toBeFalsy();
    expect(firstValue.sameValue(thirdValue)).toBeFalsy();
  });

  it('Should properly check if value is instanceof primitive', () => {
    const value = new NumberValue(10);

    expect(value.instanceOf(value)).toBeFalsy();
  });

  it('Should properly check if value is null', () => {
    const value = new NumberValue(10);

    expect(value.isNull()).toBeFalsy();
  });

  it('Should properly check if value is string', () => {
    const value = new NumberValue(10);

    expect(value.isString()).toBeFalsy();
  });

  it('Should properly check if value is function', () => {
    const value = new NumberValue(10);

    expect(value.isFunction()).toBeFalsy();
  });

  it('Should properly check if value is array', () => {
    const value = new NumberValue(10);

    expect(value.isArray()).toBeFalsy();
  });

  it('Should properly check if value is object', () => {
    const value = new NumberValue(10);

    expect(value.isObject()).toBeFalsy();
  });

  it('Should properly check if value is boolean', () => {
    const value = new NumberValue(10);

    expect(value.isBoolean()).toBeFalsy();
  });

  it('Should properly check if value is number', () => {
    const value = new NumberValue(10);

    expect(value.isBoolean()).toBeFalsy();
    expect(value.isNumber()).toBeTruthy();
  });

  it('Should properly check if value is regexp', () => {
    const value = new NumberValue(10);

    expect(value.isRegExp()).toBeFalsy();
  });

  it('Should properly check if value is class', () => {
    const value = new NumberValue(10);

    expect(value.isClass()).toBeFalsy();
  });

  it('Should properly check if value is instance', () => {
    const value = new NumberValue(10);

    expect(value.isInstance()).toBeFalsy();
  });

  it('Should properly convert value to boolean', () => {
    const value = new NumberValue(10);

    expect(typeof value.toBoolean()).toEqual('boolean');
    expect(value.toBoolean()).toEqual(true);
  });

  it('Should properly convert value to number', () => {
    const value = new NumberValue(10);

    expect(typeof value.toNumber()).toEqual('number');
    expect(value.toNumber()).toEqual(10);
  });

  it('Should properly convert value to object', () => {
    const value = new NumberValue(10);

    expect(typeof value.toObject()).toEqual('number');
    expect(value.toObject()).toEqual(10);
  });

  it('Should properly convert value to integer', () => {
    const value = new NumberValue(10);

    expect(typeof value.toInteger()).toEqual('number');
    expect(value.toInteger()).toEqual(10);
  });
});
