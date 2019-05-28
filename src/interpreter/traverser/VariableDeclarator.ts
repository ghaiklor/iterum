import { IVariableDeclarator } from "../../ast/declarations/VariableDeclarator";
import { IIdentifier } from "../../ast/miscellaneous/Identifier";
import { INode } from "../../ast/node/Node";
import { Symbol } from "../../symbols/Symbol";
import { Traverser } from "../../traverser/Traverser";

export function VariableDeclarator(n: INode, traverser: Traverser) {
  const node = n as IVariableDeclarator;
  const scope = traverser.getScope();

  let name;
  if (node.id.type === "Identifier") {
    name = (node.id as IIdentifier).name;
  } else {
    name = traverser.traverse(node.id);
  }

  let value = null;
  if (node.init !== null) {
    value = traverser.traverse(node.init);
  }

  const symbol = new Symbol(name, value);
  scope.define(symbol);
}
