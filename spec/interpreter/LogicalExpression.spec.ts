import { Interpreter } from "../../src/interpreter/Interpreter";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Interpreter::LogicalExpression", () => {
  it("Should properly interpret logical expression (&&)", () => {
    const source = `true && true`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(true);
  });

  it("Should properly interpret logical expression (||)", () => {
    const source = `false || true`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(true);
  });

  it("Should properly short circuit on &&", () => {
    const source = `false && true`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(false);
  });

  it("Should properly short circuit on ||", () => {
    const source = `true || false`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(true);
  });
});
