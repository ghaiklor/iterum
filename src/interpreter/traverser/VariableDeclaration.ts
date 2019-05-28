import { IVariableDeclaration } from "../../ast/declarations/VariableDeclaration";
import { INode } from "../../ast/node/Node";
import { Traverser } from "../../traverser/Traverser";

export function VariableDeclaration(node: INode, traverser: Traverser) {
  (node as IVariableDeclaration).declarations.forEach((decl) => traverser.traverse(decl));
}
