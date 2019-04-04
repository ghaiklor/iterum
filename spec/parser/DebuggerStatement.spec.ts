import { IProgram } from "../../src/ast/programs/Program";
import { IDebuggerStatement } from "../../src/ast/statements/DebuggerStatement";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Parser::DebuggerStatement", () => {
  it("Should properly parse the statement", () => {
    const source = `debugger;`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        loc: null,
        type: "DebuggerStatement",
      } as IDebuggerStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });
});
