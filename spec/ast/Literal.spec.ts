import { Literal } from "../../src/ast/Literal";

describe("Iterum::AST::Literal", () => {
  it("Should properly serialize node to JSON", () => {
    const literal = new Literal(5, "5");

    expect(JSON.stringify(literal)).toEqual(`{"type":"Literal","value":5,"raw":"5"}`);
  });
});
