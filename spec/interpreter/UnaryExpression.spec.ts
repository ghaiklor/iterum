import { Interpreter } from "../../src/interpreter/Interpreter";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Interpreter::UnaryExpression", () => {
  it("Should properly interpret unary expression (-)", () => {
    const source = `-5`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(-5);
  });

  it("Should properly interpret unary expression (+)", () => {
    const source = `+5`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(5);
  });

  it("Should properly interpret unary expression (!)", () => {
    const source = `!false`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(true);
  });

  it("Should properly interpret unary expression (~)", () => {
    const source = `~0`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(-1);
  });

  it("Should properly interpret unary expression (typeof)", () => {
    const source = `typeof "Hello, World!"`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual("string");
  });

  it("Should properly interpret unary expression (void)", () => {
    const source = `void 0`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(null);
  });
});
