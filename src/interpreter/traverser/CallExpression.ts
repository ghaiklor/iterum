import { ICallExpression } from "../../ast/expressions/CallExpression";
import { INode } from "../../ast/node/Node";
import { Function } from "../../runtime/function/Function";
import { ITraverseContext } from "../../traverser/Traverser";

export function CallExpression(n: INode, context: ITraverseContext) {
  const { traverser } = context;
  const node = n as ICallExpression;
  const args = [];
  const callee = traverser.traverse(node.callee, context);

  for (const arg of node.arguments) {
    args.push(traverser.traverse(arg, context));
  }

  // tslint:disable-next-line: ban-types
  const fn = callee as Function;
  return fn.call(args, context);
}
