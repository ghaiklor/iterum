import { Interpreter } from "../../src/interpreter/Interpreter";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Interpreter", () => {
  it("Should properly interpret binary expression (equal)", () => {
    const source = `2 == 5`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(false);
  });

  it("Should properly interpret binary expression (not equal)", () => {
    const source = `2 != 5`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(true);
  });

  it("Should properly interpret binary expression (strict equal)", () => {
    const source = `2 === 5`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(false);
  });

  it("Should properly interpret binary expression (not strict equal)", () => {
    const source = `2 !== 5`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(true);
  });

  it("Should properly interpret binary expression (less than)", () => {
    const source = `2 < 5`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(true);
  });

  it("Should properly interpret binary expression (less than or equal)", () => {
    const source = `2 <= 5`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(true);
  });

  it("Should properly interpret binary expression (greater than)", () => {
    const source = `2 > 5`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(false);
  });

  it("Should properly interpret binary expression (greater than or equal)", () => {
    const source = `2 >= 5`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(false);
  });

  it("Should properly interpret binary expression (bitwise shift left)", () => {
    const source = `2 << 1`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(4);
  });

  it("Should properly interpret binary expression (bitwise shift right)", () => {
    const source = `4 >> 1`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(2);
  });

  it("Should properly interpret binary expression (bitwise shift right zero)", () => {
    const source = `4 >>> 1`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(2);
  });

  it("Should properly interpret binary expression (plus)", () => {
    const source = `2 + 5`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(7);
  });

  it("Should properly interpret binary expression (minus)", () => {
    const source = `2 - 5`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(-3);
  });

  it("Should properly interpret binary expression (multiply)", () => {
    const source = `2 * 5`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(10);
  });

  it("Should properly interpret binary expression (exponentiation)", () => {
    const source = `2 ** 5`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(32);
  });

  it("Should properly interpret binary expression (divide)", () => {
    const source = `10 / 5`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(2);
  });

  it("Should properly interpret binary expression (modulus)", () => {
    const source = `10 % 4`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(2);
  });

  it("Should properly interpret binary expression (bitwise and)", () => {
    const source = `2 & 1`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(0);
  });

  it("Should properly interpret binary expression (bitwise or)", () => {
    const source = `2 | 1`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(3);
  });

  it("Should properly interpret binary expression (bitwise xor)", () => {
    const source = `2 ^ 1`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(3);
  });

  it("Should properly interpret array expression", () => {
    const source = `[1, 2, 3]`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual([1, 2, 3]);
  });

  it("Should properly interpret variable declaration", () => {
    const source = `let a = 5;`;
    const ast = Parser.parse(source);
    const interpreter = new Interpreter(ast);
    const scope = interpreter.getScope();

    expect(scope.lookup("a")).toBeUndefined();
    interpreter.interpret();

    const aSymbol = scope.lookup("a");
    if (aSymbol) {
      expect(aSymbol.name).toEqual("a");
      expect(aSymbol.value).toEqual(5);
    } else {
      throw new Error("aSymbol must be declared");
    }
  });

  it("Should properly interpret binary expression with variables", () => {
    const source = `
      let a = 5;
      let b = 2;

      a * b;
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(10);
  });
});
