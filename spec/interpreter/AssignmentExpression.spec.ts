import { Interpreter } from '../../src/interpreter/Interpreter';
import { Parser } from '../../src/parser/Parser';

describe('Iterum::Interpreter::AssignmentExpression', () => {
  it('Should properly interpret assignment expression (with plus)', () => {
    const source = `
      let a = 5;
      let b = 2;

      a += b;
      a;
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(7);
  });

  it('Should properly interpret assignment expression (with minus)', () => {
    const source = `
      let a = 5;
      let b = 2;

      a -= b;
      a;
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(3);
  });

  it('Should properly interpret assignment expression (with multiply)', () => {
    const source = `
      let a = 5;
      let b = 2;

      a *= b;
      a;
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(10);
  });

  it('Should properly interpret assignment expression (with exponentiation)', () => {
    const source = `
      let a = 5;
      let b = 2;

      a **= b;
      a;
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(25);
  });

  it('Should properly interpret assignment expression (with divide)', () => {
    const source = `
      let a = 6;
      let b = 2;

      a /= b;
      a;
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(3);
  });

  it('Should properly interpret assignment expression (with modulus)', () => {
    const source = `
      let a = 5;
      let b = 2;

      a %= b;
      a;
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(1);
  });

  it('Should properly interpret assignment expression (with bitwise shift to left)', () => {
    const source = `
      let a = 4;
      let b = 1;

      a <<= b;
      a;
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(8);
  });

  it('Should properly interpret assignment expression (with bitwise shift to right)', () => {
    const source = `
      let a = 4;
      let b = 1;

      a >>= b;
      a;
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(2);
  });

  it('Should properly interpret assignment expression (with logical bitwise shift to right)', () => {
    const source = `
      let a = 4;
      let b = 1;

      a >>>= b;
      a;
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(2);
  });

  it('Should properly interpret assignment expression (with bitwise or)', () => {
    const source = `
      let a = 4;
      let b = 1;

      a |= b;
      a;
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(5);
  });

  it('Should properly interpret assignment expression (with bitwise xor)', () => {
    const source = `
      let a = 4;
      let b = 1;

      a ^= b;
      a;
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(5);
  });

  it('Should properly interpret assignment expression (with bitwise and)', () => {
    const source = `
      let a = 4;
      let b = 1;

      a &= b;
      a;
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(0);
  });

  it('Should properly interpret assignment expression (with member expression)', () => {
    const source = `
      class Point {}
      const point = new Point();

      point.x = 2;
      point.y = 3;

      point.x + point.y;
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(5);
  });

  it('Should properly interpret assignment expression (with member expression and updater)', () => {
    const source = `
      class Point {}
      const point = new Point();

      point.x += 2;
      point.y += 3;

      point.x **= 2;

      point.x + point.y;
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(7);
  });
});
