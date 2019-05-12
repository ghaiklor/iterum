import { IBinaryExpression } from "../../src/ast/expressions/BinaryExpression";
import { ILiteral } from "../../src/ast/literals/Literal";
import { BinaryOperator } from "../../src/ast/operators/BinaryOperator";
import { IProgram } from "../../src/ast/programs/Program";
import { IExpressionStatement } from "../../src/ast/statements/ExpressionStatement";
import { Parser } from "../../src/parser/Parser";
import { Visitor } from "../../src/visitor/Visitor";

describe("Iterum::Visitor", () => {
  it("Should properly traverse the binary expression", () => {
    const source = `2 + 5`;
    const ast = Parser.parse(source);
    const traverser = new Visitor({
      BinaryExpression: (node: IBinaryExpression, visitor) => {
        const left = visitor.visit(node.left);
        const right = visitor.visit(node.right);

        switch (node.operator) {
          case BinaryOperator.PLUS:
            return left + right;
        }
      },
      ExpressionStatement: (node: IExpressionStatement, visitor) => {
        return visitor.visit(node.expression);
      },
      Literal: (node: ILiteral) => {
        return node.value;
      },
      Program: (node: IProgram, visitor) => {
        return node.body.map((n) => visitor.visit(n))[0];
      },
    });

    expect(traverser.visit(ast)).toEqual(7);
  });

  it("Should properly throw an error if visitor is not found for the node", () => {
    const source = `2`;
    const ast = Parser.parse(source);
    const visitor = new Visitor({});

    expect(() => visitor.visit(ast)).toThrowError("No visitor found for Program");
  });
});
