import { IMemberExpression } from "../../src/ast/expressions/MemberExpression";
import { IIdentifier } from "../../src/ast/miscellaneous/Identifier";
import { IProgram } from "../../src/ast/programs/Program";
import { IExpressionStatement } from "../../src/ast/statements/ExpressionStatement";
import { Parser } from "../../src/parser/Parser";
import { ILiteral } from "../../src/ast/miscellaneous/Literal";

describe("Iterum::Parser::MemberExpression", () => {
  it("Should properly parse member expression with dot notation", () => {
    const source = `foo.bar`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          computed: false,
          loc: null,
          object: { name: "foo", type: "Identifier", loc: null } as IIdentifier,
          property: { name: "bar", type: "Identifier" } as IIdentifier,
          type: "MemberExpression",
        } as IMemberExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse member expression with square brackets", () => {
    const source = `foo["bar"]`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          computed: false,
          loc: null,
          object: { name: "foo", type: "Identifier", loc: null } as IIdentifier,
          property: { raw: "bar", value: "bar", type: "Literal", loc: null } as ILiteral,
          type: "MemberExpression",
        } as IMemberExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });
});
