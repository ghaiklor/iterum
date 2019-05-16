import { IIdentifier } from "../../ast/miscellaneous/Identifier";
import { INode } from "../../ast/node/Node";
import { Visitor } from "../../visitor/Visitor";

export function Identifier(n: INode, visitor: Visitor) {
  const node = n as IIdentifier;
  const scope = visitor.getScope();
  const value = scope.lookup(node.name);

  if (value !== undefined) {
    return value.value;
  }

  return node.name;
}
