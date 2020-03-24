import { Interpreter } from '../../src/interpreter/Interpreter';
import { Parser } from '../../src/parser/Parser';

describe('Iterum::Interpreter::BinaryExpression', () => {
  it('Should properly interpret binary expression (equal)', () => {
    const source = '2 == 5';
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(false);
  });

  it('Should properly interpret binary expression (not equal)', () => {
    const source = '2 != 5';
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(true);
  });

  it('Should properly interpret binary expression (strict equal)', () => {
    const source = '2 === 5';
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(false);
  });

  it('Should properly interpret binary expression (not strict equal)', () => {
    const source = '2 !== 5';
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(true);
  });

  it('Should properly interpret binary expression (less than)', () => {
    const source = '2 < 5';
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(true);
  });

  it('Should properly interpret binary expression (less than or equal)', () => {
    const source = '2 <= 5';
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(true);
  });

  it('Should properly interpret binary expression (greater than)', () => {
    const source = '2 > 5';
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(false);
  });

  it('Should properly interpret binary expression (greater than or equal)', () => {
    const source = '2 >= 5';
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(false);
  });

  it('Should properly interpret binary expression (bitwise shift left)', () => {
    const source = '2 << 1';
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(4);
  });

  it('Should properly interpret binary expression (bitwise shift right)', () => {
    const source = '4 >> 1';
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(2);
  });

  it('Should properly interpret binary expression (bitwise shift right zero)', () => {
    const source = '4 >>> 1';
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(2);
  });

  it('Should properly interpret binary expression (plus)', () => {
    const source = '2 + 5';
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(7);
  });

  it('Should properly interpret binary expression (minus)', () => {
    const source = '2 - 5';
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(-3);
  });

  it('Should properly interpret binary expression (multiply)', () => {
    const source = '2 * 5';
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(10);
  });

  it('Should properly interpret binary expression (exponentiation)', () => {
    const source = '2 ** 5';
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(32);
  });

  it('Should properly interpret binary expression (divide)', () => {
    const source = '10 / 5';
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(2);
  });

  it('Should properly interpret binary expression (modulus)', () => {
    const source = '10 % 4';
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(2);
  });

  it('Should properly interpret binary expression (bitwise and)', () => {
    const source = '2 & 1';
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(0);
  });

  it('Should properly interpret binary expression (bitwise or)', () => {
    const source = '2 | 1';
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(3);
  });

  it('Should properly interpret binary expression (bitwise xor)', () => {
    const source = '2 ^ 1';
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(3);
  });
});
