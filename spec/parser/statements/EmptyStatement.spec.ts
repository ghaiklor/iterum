import { IProgram } from "../../../src/ast/programs/Program";
import { IEmptyStatement } from "../../../src/ast/statements/EmptyStatement";
import { Parser } from "../../../src/parser/Parser";

describe("Iterum::Parser::EmptyStatement", () => {
  it("Should properly parse the statement", () => {
    const source = `;`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        loc: null,
        type: "EmptyStatement",
      } as IEmptyStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });
});
