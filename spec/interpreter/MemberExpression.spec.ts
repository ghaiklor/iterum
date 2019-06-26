import { Interpreter } from "../../src/interpreter/Interpreter";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Interpreter::MemberExpression", () => {
  it("Should properly return null if field does not exist on object", () => {
    const source = `
      class Foo {}

      let foo = new Foo();
      foo.x;
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(null);
  });

  it("Should properly throw an error if trying to access field in non-instance value", () => {
    const source = `
      let a = 2;
      a.x;
    `;

    const ast = Parser.parse(source);
    expect(() => Interpreter.interpret(ast)).toThrowError("2 is not an instance of a class");
  });
});
