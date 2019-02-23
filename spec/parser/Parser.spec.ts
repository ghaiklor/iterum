import { NumberLiteral } from "../../src/ast/NumberLiteral";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Parser", () => {
  it("Should properly parse the number literal", () => {
    const source = `5 10 -20 -4.20`;
    const parser = new Parser(source);
    const ast = parser.parse();

    expect(ast.nodes[0]).toMatchObject({ value: 5 } as NumberLiteral);
    // FIXME: fix me asap
    // expect(ast.nodes[1]).toMatchObject({ value: 10 } as NumberLiteral);
    // expect(ast.nodes[2]).toMatchObject({ value: -20 } as NumberLiteral);
    // expect(ast.nodes[3]).toMatchObject({ value: -4.20 } as NumberLiteral);
    // expect(ast.nodes[4]).toBeUndefined();
  });
});
