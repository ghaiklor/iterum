import { INode } from "../../ast/node/Node";
import { IProgram } from "../../ast/programs/Program";
import { ITraverseContext } from "../../traverser/Traverser";

export function Program(node: INode, context: ITraverseContext) {
  return (node as IProgram).body.map((n) => context.traverser.traverse(n, context)).pop();
}
