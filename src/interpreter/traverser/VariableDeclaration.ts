import { IVariableDeclaration } from "../../ast/declarations/VariableDeclaration";
import { INode } from "../../ast/node/Node";
import { ITraverseContext } from "../../traverser/Traverser";

export function VariableDeclaration(n: INode, context: ITraverseContext) {
  const { traverser } = context;
  const node = n as IVariableDeclaration;

  node.declarations.forEach((decl) => traverser.traverse(decl, context));
}
