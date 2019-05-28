import { IBinaryExpression } from "../../src/ast/expressions/BinaryExpression";
import { ILiteral } from "../../src/ast/literals/Literal";
import { BinaryOperator } from "../../src/ast/operators/BinaryOperator";
import { IProgram } from "../../src/ast/programs/Program";
import { IExpressionStatement } from "../../src/ast/statements/ExpressionStatement";
import { Parser } from "../../src/parser/Parser";
import { Traverser } from "../../src/traverser/Traverser";

describe("Iterum::Visitor", () => {
  it("Should properly traverse the binary expression", () => {
    const source = `2 + 5`;
    const ast = Parser.parse(source);
    const walker = new Traverser({
      BinaryExpression: (n, traverser) => {
        const node = n as IBinaryExpression;
        const left = traverser.traverse(node.left);
        const right = traverser.traverse(node.right);

        switch (node.operator) {
          case BinaryOperator.PLUS:
            return left + right;
        }
      },
      ExpressionStatement: (node, traverser) => {
        return traverser.traverse((node as IExpressionStatement).expression);
      },
      Literal: (node) => {
        return (node as ILiteral).value;
      },
      Program: (node, traverser) => {
        return (node as IProgram).body.map((n) => traverser.traverse(n))[0];
      },
    });

    expect(walker.traverse(ast)).toEqual(7);
  });

  it("Should properly throw an error if visitor is not found for the node", () => {
    const source = `2`;
    const ast = Parser.parse(source);
    const walker = new Traverser({});

    expect(() => walker.traverse(ast)).toThrowError("No traverser found for Program");
  });
});
