import { IMemberExpression } from "../../src/ast/expressions/MemberExpression";
import { IIdentifier } from "../../src/ast/miscellaneous/Identifier";
import { IProgram } from "../../src/ast/programs/Program";
import { IExpressionStatement } from "../../src/ast/statements/ExpressionStatement";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Parser::MemberExpression", () => {
  it("Should properly parse member expression with single dot notation", () => {
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

  it("Should properly parse member expression with dot notations", () => {
    const source = `foo.bar.baz`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          computed: false,
          loc: null,
          object: {
            computed: false,
            loc: null,
            object: { name: "foo", type: "Identifier", loc: null } as IIdentifier,
            property: { name: "bar", type: "Identifier" } as IIdentifier,
            type: "MemberExpression",
          } as IMemberExpression,
          property: { name: "baz", type: "Identifier" } as IIdentifier,
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
