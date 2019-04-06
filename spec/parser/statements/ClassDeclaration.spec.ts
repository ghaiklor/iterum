import { IClassBody } from "../../../src/ast/declarations/ClassBody";
import { IClassDeclaration } from "../../../src/ast/declarations/ClassDeclaration";
import { IMethodDefinition } from "../../../src/ast/definitions/MethodDefinition";
import { IAssignmentExpression } from "../../../src/ast/expressions/AssignmentExpression";
import { IBinaryExpression } from "../../../src/ast/expressions/BinaryExpression";
import { IFunctionExpression } from "../../../src/ast/expressions/FunctionExpression";
import { IMemberExpression } from "../../../src/ast/expressions/MemberExpression";
import { IThisExpression } from "../../../src/ast/expressions/ThisExpression";
import { IIdentifier } from "../../../src/ast/miscellaneous/Identifier";
import { IProgram } from "../../../src/ast/programs/Program";
import { IBlockStatement } from "../../../src/ast/statements/BlockStatement";
import { IExpressionStatement } from "../../../src/ast/statements/ExpressionStatement";
import { IReturnStatement } from "../../../src/ast/statements/ReturnStatement";
import { Parser } from "../../../src/parser/Parser";

describe("Iterum::Parser::ClassDeclarations", () => {
  it("Should properly parse the class with all method definitions", () => {
    const source = `
      {
        class Foo extends Bar {
          constructor(a, b) {
            this.a = a;
            this.b = b;
          }

          add(a, b) {
            return a + b;
          }

          get a() {
            return a;
          }

          set a(value) {
            this.a = value;
          }
        }
      }
    `;

    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        body: [{
          body: {
            body: [
              {
                computed: false,
                key: { type: "Identifier", loc: null, name: "constructor" } as IIdentifier,
                kind: "constructor",
                loc: null,
                static: false,
                type: "MethodDefinition",
                value: {
                  body: {
                    body: [
                      {
                        expression: {
                          left: {
                            computed: false,
                            loc: null,
                            object: { type: "ThisExpression", loc: null } as IThisExpression,
                            property: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
                            type: "MemberExpression",
                          } as IMemberExpression,
                          loc: null,
                          operator: "=",
                          right: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
                          type: "AssignmentExpression",
                        } as IAssignmentExpression,
                        loc: null,
                        type: "ExpressionStatement",
                      } as IExpressionStatement,
                      {
                        expression: {
                          left: {
                            computed: false,
                            loc: null,
                            object: { type: "ThisExpression", loc: null } as IThisExpression,
                            property: { type: "Identifier", loc: null, name: "b" } as IIdentifier,
                            type: "MemberExpression",
                          } as IMemberExpression,
                          loc: null,
                          operator: "=",
                          right: { type: "Identifier", loc: null, name: "b" } as IIdentifier,
                          type: "AssignmentExpression",
                        } as IAssignmentExpression,
                        loc: null,
                        type: "ExpressionStatement",
                      } as IExpressionStatement,
                    ],
                    loc: null,
                    type: "BlockStatement",
                  } as IBlockStatement,
                  defaults: null,
                  expression: false,
                  generator: false,
                  id: null,
                  loc: null,
                  params: [
                    { type: "Identifier", loc: null, name: "a" } as IIdentifier,
                    { type: "Identifier", loc: null, name: "b" } as IIdentifier,
                  ],
                  rest: null,
                  type: "FunctionExpression",
                } as IFunctionExpression,
              } as IMethodDefinition,
              {
                computed: false,
                key: { type: "Identifier", loc: null, name: "add" } as IIdentifier,
                kind: "method",
                loc: null,
                static: false,
                type: "MethodDefinition",
                value: {
                  body: {
                    body: [{
                      argument: {
                        left: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
                        loc: null,
                        operator: "+",
                        right: { type: "Identifier", loc: null, name: "b" } as IIdentifier,
                        type: "BinaryExpression",
                      } as IBinaryExpression,
                      loc: null,
                      type: "ReturnStatement",
                    } as IReturnStatement],
                    loc: null,
                    type: "BlockStatement",
                  } as IBlockStatement,
                  defaults: null,
                  expression: false,
                  generator: false,
                  id: null,
                  loc: null,
                  params: [
                    { type: "Identifier", loc: null, name: "a" } as IIdentifier,
                    { type: "Identifier", loc: null, name: "b" } as IIdentifier,
                  ],
                  rest: null,
                  type: "FunctionExpression",
                } as IFunctionExpression,
              } as IMethodDefinition,
              {
                computed: false,
                key: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
                kind: "get",
                loc: null,
                static: false,
                type: "MethodDefinition",
                value: {
                  body: {
                    body: [{
                      argument: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
                      loc: null,
                      type: "ReturnStatement",
                    } as IReturnStatement],
                    loc: null,
                    type: "BlockStatement",
                  } as IBlockStatement,
                  defaults: null,
                  expression: false,
                  generator: false,
                  id: null,
                  loc: null,
                  params: [],
                  rest: null,
                  type: "FunctionExpression",
                } as IFunctionExpression,
              } as IMethodDefinition,
              {
                computed: false,
                key: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
                kind: "set",
                loc: null,
                static: false,
                type: "MethodDefinition",
                value: {
                  body: {
                    body: [{
                      expression: {
                        left: {
                          computed: false,
                          loc: null,
                          object: { type: "ThisExpression", loc: null } as IThisExpression,
                          property: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
                          type: "MemberExpression",
                        } as IMemberExpression,
                        loc: null,
                        operator: "=",
                        right: { type: "Identifier", loc: null, name: "value" } as IIdentifier,
                        type: "AssignmentExpression",
                      } as IAssignmentExpression,
                      loc: null,
                      type: "ExpressionStatement",
                    } as IExpressionStatement],
                    loc: null,
                    type: "BlockStatement",
                  } as IBlockStatement,
                  defaults: null,
                  expression: false,
                  generator: false,
                  id: null,
                  loc: null,
                  params: [
                    { type: "Identifier", loc: null, name: "value" } as IIdentifier,
                  ],
                  rest: null,
                  type: "FunctionExpression",
                } as IFunctionExpression,
              } as IMethodDefinition,
            ],
            loc: null,
            type: "ClassBody",
          } as IClassBody,
          id: { type: "Identifier", loc: null, name: "Foo" } as IIdentifier,
          loc: null,
          superClass: { type: "Identifier", loc: null, name: "Bar" } as IIdentifier,
          type: "ClassDeclaration",
        } as IClassDeclaration],
        loc: null,
        type: "BlockStatement",
      } as IBlockStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });
});
