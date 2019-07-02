import { INewExpression } from "../../ast/expressions/NewExpression";
import { INode } from "../../ast/node/Node";
import { RuntimeError } from "../../errors/RuntimeError";
import { ClassValue } from "../../runtime/classes/ClassValue";
import { Value } from "../../runtime/Value";
import { ITraverseContext } from "../../traverser/Traverser";

export function NewExpression(n: INode, context: ITraverseContext): Value {
  const { traverser } = context;
  const node = n as INewExpression;
  const args = [];
  const klass = traverser.traverse(node.callee, context);

  if (!(klass instanceof ClassValue)) {
    throw new RuntimeError(RuntimeError.NEW_CALLED_ON_NON_CLASS, klass.toString());
  }

  if (klass.arity() !== node.arguments.length) {
    const expected = klass.arity().toString();
    const got = node.arguments.length.toString();
    throw new RuntimeError(RuntimeError.ARITY_MISMATCH, klass.toString(), expected, got);
  }

  for (const arg of node.arguments) {
    args.push(traverser.traverse(arg, context));
  }

  return klass.call(args, context);
}
