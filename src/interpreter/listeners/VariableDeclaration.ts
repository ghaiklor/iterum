import { IVariableDeclaration } from "../../ast/declarations/VariableDeclaration";
import { INode } from "../../ast/node/Node";
import { NullValue } from "../../runtime/primitives/NullValue";
import { Value } from "../../runtime/Value";
import { ITraverseContext } from "../../traverser/Traverser";

export function VariableDeclaration(n: INode, context: ITraverseContext): Value {
  const { traverser } = context;
  const node = n as IVariableDeclaration;

  node.declarations.forEach((decl) => traverser.traverse(decl, context));
  return new NullValue();
}
