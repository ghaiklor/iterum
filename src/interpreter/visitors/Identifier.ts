import { IIdentifier } from "../../ast/miscellaneous/Identifier";
import { INode } from "../../ast/node/Node";

export function Identifier(node: INode) {
  return (node as IIdentifier).name;
}
