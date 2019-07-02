import { IClassDeclaration } from "../../ast/classes/ClassDeclaration";
import { INode } from "../../ast/node/Node";
import { RuntimeError } from "../../errors/RuntimeError";
import { ClassValue } from "../../runtime/classes/ClassValue";
import { NullValue } from "../../runtime/primitives/NullValue";
import { Value } from "../../runtime/Value";
import { Symbol } from "../../symbols/Symbol";
import { ITraverseContext } from "../../traverser/Traverser";

export function ClassDeclaration(n: INode, context: ITraverseContext): Value {
  const { traverser, scope } = context;
  const node = n as IClassDeclaration;
  const className = node.id.name;

  let superClass = null;
  if (node.superClass !== null) {
    superClass = traverser.traverse(node.superClass, context);
    if (!(superClass instanceof ClassValue)) {
      throw new RuntimeError(RuntimeError.SUPERCLASS_MUST_BE_A_CLASS, superClass.toString());
    }
  }

  const classValue = new ClassValue(node, scope, superClass);
  scope.define(new Symbol(className, classValue));

  return new NullValue();
}
