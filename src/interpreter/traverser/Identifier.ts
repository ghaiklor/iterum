import { IIdentifier } from "../../ast/miscellaneous/Identifier";
import { INode } from "../../ast/node/Node";
import { Traverser } from "../../traverser/Traverser";

export function Identifier(n: INode, traverser: Traverser) {
  const node = n as IIdentifier;
  const scope = traverser.getScope();
  const value = scope.lookup(node.name);

  if (value !== undefined) {
    return value.value;
  }

  throw new Error(`Variable ${node.name} is not defined`);
}
