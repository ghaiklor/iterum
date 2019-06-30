import { ICallExpression } from "../../ast/expressions/CallExpression";
import { INode } from "../../ast/node/Node";
import { RuntimeError } from "../../errors/RuntimeError";
import { FunctionValue } from "../../runtime/functions/FunctionValue";
import { Value } from "../../runtime/Value";
import { ITraverseContext } from "../../traverser/Traverser";

export function CallExpression(n: INode, context: ITraverseContext): Value {
  const { traverser } = context;
  const node = n as ICallExpression;
  const args = [];
  const callee = traverser.traverse(node.callee, context);

  if (!(callee instanceof FunctionValue)) {
    throw new RuntimeError(RuntimeError.VALUE_IS_NOT_A_FUNCTION, callee.toString());
  }

  for (const arg of node.arguments) {
    args.push(traverser.traverse(arg, context));
  }

  const fn = callee;
  return fn.call(args, context);
}
