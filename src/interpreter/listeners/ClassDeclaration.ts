import { IClassDeclaration } from "../../ast/classes/ClassDeclaration";
import { INode } from "../../ast/node/Node";
import { ClassValue } from "../../runtime/classes/ClassValue";
import { NullValue } from "../../runtime/primitives/NullValue";
import { Value } from "../../runtime/Value";
import { Symbol } from "../../symbols/Symbol";
import { ITraverseContext } from "../../traverser/Traverser";

export function ClassDeclaration(n: INode, context: ITraverseContext): Value {
  const { scope } = context;
  const node = n as IClassDeclaration;
  const className = node.id.name;
  const classValue = new ClassValue(node);
  scope.define(new Symbol(className, classValue));

  return new NullValue();
}
