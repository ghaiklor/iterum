import { INewExpression } from "../../ast/expressions/NewExpression";
import { INode } from "../../ast/node/Node";
import { RuntimeError } from "../../errors/RuntimeError";
import { ClassValue } from "../../runtime/classes/ClassValue";
import { InstanceValue } from "../../runtime/classes/InstanceValue";
import { Value } from "../../runtime/Value";
import { ITraverseContext } from "../../traverser/Traverser";

export function NewExpression(n: INode, context: ITraverseContext): Value {
  const { traverser } = context;
  const node = n as INewExpression;
  const klass = traverser.traverse(node.callee, context);

  if (!(klass instanceof ClassValue)) {
    throw new RuntimeError(RuntimeError.NEW_CALLED_ON_NON_CLASS, klass.toString());
  }

  return new InstanceValue(klass);
}
