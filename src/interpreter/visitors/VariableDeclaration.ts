import { IVariableDeclaration } from "../../ast/declarations/VariableDeclaration";
import { INode } from "../../ast/node/Node";
import { Visitor } from "../../visitor/Visitor";

export function VariableDeclaration(node: INode, visitor: Visitor) {
  return (node as IVariableDeclaration).declarations.map((decl) => visitor.visit(decl));
}
