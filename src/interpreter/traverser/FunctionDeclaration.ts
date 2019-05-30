import { IFunctionDeclaration } from "../../ast/declarations/FunctionDeclaration";
import { INode } from "../../ast/node/Node";
import { Function } from "../../runtime/function/Function";
import { Symbol } from "../../symbols/Symbol";
import { ITraverseContext } from "../../traverser/Traverser";

export function FunctionDeclaration(n: INode, context: ITraverseContext) {
  const { scope } = context;
  const node = n as IFunctionDeclaration;
  const name = node.id.name;
  const fn = new Function(node);

  scope.define(new Symbol(name, fn));
}
