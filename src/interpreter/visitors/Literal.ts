import { ILiteral } from "../../ast/literals/Literal";
import { INode } from "../../ast/node/Node";

export function Literal(node: INode) {
  return (node as ILiteral).value;
}
