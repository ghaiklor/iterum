import { INode } from "../../ast/node/Node";
import { IProgram } from "../../ast/programs/Program";
import { Traverser } from "../../traverser/Traverser";

export function Program(node: INode, traverser: Traverser) {
  return (node as IProgram).body.map((n) => traverser.traverse(n)).pop();
}
