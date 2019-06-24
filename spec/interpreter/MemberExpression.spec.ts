import { Interpreter } from "../../src/interpreter/Interpreter";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Interpreter::MemberExpression", () => {
  it("Should properly throw if field is not found", () => {
    const source = `
      class Foo {}

      let foo = new Foo();
      foo.x;
    `;

    const ast = Parser.parse(source);
    expect(() => Interpreter.interpret(ast)).toThrowError("x is not exists");
  });
});