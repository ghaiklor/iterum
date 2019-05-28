import { IVariableDeclarator } from "../../ast/declarations/VariableDeclarator";
import { IIdentifier } from "../../ast/miscellaneous/Identifier";
import { INode } from "../../ast/node/Node";
import { Symbol } from "../../symbols/Symbol";
import { ITraverseContext } from "../../traverser/Traverser";

export function VariableDeclarator(n: INode, context: ITraverseContext) {
  const { traverser, scope } = context;
  const node = n as IVariableDeclarator;

  let name;
  if (node.id.type === "Identifier") {
    name = (node.id as IIdentifier).name;
  } else {
    name = traverser.traverse(node.id, context);
  }

  let value = null;
  if (node.init !== null) {
    value = traverser.traverse(node.init, context);
  }

  const symbol = new Symbol(name, value);
  scope.define(symbol);
}
