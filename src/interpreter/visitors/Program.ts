import { INode } from "../../ast/node/Node";
import { IProgram } from "../../ast/programs/Program";
import { Visitor } from "../../visitor/Visitor";

export function Program(node: INode, visitor: Visitor) {
  return (node as IProgram).body.map((n) => visitor.visit(n)).pop();
}
