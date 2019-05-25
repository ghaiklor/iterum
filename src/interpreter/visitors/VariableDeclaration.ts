import { IVariableDeclaration } from "../../ast/declarations/VariableDeclaration";
import { INode } from "../../ast/node/Node";
import { Visitor } from "../../visitor/Visitor";

export function VariableDeclaration(node: INode, visitor: Visitor) {
  (node as IVariableDeclaration).declarations.forEach((decl) => visitor.visit(decl));
}
