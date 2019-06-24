import { IMemberExpression } from "../../ast/expressions/MemberExpression";
import { IIdentifier } from "../../ast/miscellaneous/Identifier";
import { INode } from "../../ast/node/Node";
import { RuntimeError } from "../../errors/RuntimeError";
import { InstanceValue } from "../../runtime/classes/InstanceValue";
import { Value } from "../../runtime/Value";
import { ITraverseContext } from "../../traverser/Traverser";

export function MemberExpression(n: INode, context: ITraverseContext): Value | never {
  const { traverser } = context;
  const node = n as IMemberExpression;
  const object = traverser.traverse(node.object, context);

  if (object instanceof InstanceValue) {
    return object.getField((node.property as IIdentifier).name);
  }

  throw new RuntimeError(RuntimeError.PROPERTY_ACCESS_ON_NON_INSTANCE, object.toString());
}
