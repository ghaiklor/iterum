import { INode } from "../../ast/node/Node";
import { RuntimeError } from "../../errors/RuntimeError";
import { InstanceValue } from "../../runtime/classes/InstanceValue";
import { ITraverseContext } from "../../traverser/Traverser";

export function ThisExpression(_: INode, context: ITraverseContext): InstanceValue {
  const { scope } = context;
  const instance = scope.lookup("this").value;

  if (!(instance instanceof InstanceValue)) {
    throw new RuntimeError(RuntimeError.THIS_IS_NOT_AN_INSTANCE);
  }

  return instance;
}
