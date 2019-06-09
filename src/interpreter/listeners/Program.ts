import { INode } from "../../ast/node/Node";
import { IProgram } from "../../ast/programs/Program";
import { Value } from "../../runtime/Value";
import { ITraverseContext } from "../../traverser/Traverser";

export function Program(n: INode, context: ITraverseContext): Value {
  const node = n as IProgram;
  const body = node.body;

  for (let i = 0; i < body.length - 1; i++) {
    context.traverser.traverse(body[i], context);
  }

  return context.traverser.traverse(body[body.length - 1], context);
}
