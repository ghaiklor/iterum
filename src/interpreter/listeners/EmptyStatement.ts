import { INode } from "../../ast/node/Node";
import { NullValue } from "../../runtime/primitives/NullValue";
import { Value } from "../../runtime/Value";
import { ITraverseContext } from "../../traverser/Traverser";

export function EmptyStatement(_: INode, __: ITraverseContext): Value {
  return new NullValue();
}
