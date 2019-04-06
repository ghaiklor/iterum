import { IIdentifier } from "../../../src/ast/miscellaneous/Identifier";
import { IProgram } from "../../../src/ast/programs/Program";
import { IBreakStatement } from "../../../src/ast/statements/BreakStatement";
import { Parser } from "../../../src/parser/Parser";

describe("Iterum::Parser::BreakStatement", () => {
  it("Should properly parse the statement without label", () => {
    const source = `break;`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        label: null,
        loc: null,
        type: "BreakStatement",
      } as IBreakStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse the statement with label", () => {
    const source = `break foo;`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        label: { type: "Identifier", loc: null, name: "foo" } as IIdentifier,
        loc: null,
        type: "BreakStatement",
      } as IBreakStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });
});
