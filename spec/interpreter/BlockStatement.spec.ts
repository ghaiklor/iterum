import { Interpreter } from "../../src/interpreter/Interpreter";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Interpreter::BlockStatement", () => {
  it("Should properly interpret binary expression with variables in different lexical scopes", () => {
    const source = `
      let result;

      {
        let a = 2;
        {
          let b = 3;
          {
            let c = 4;
            result = a + b + c;
          }
        }
      }

      result;
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(9);
  });
});
