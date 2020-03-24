import { INode } from '../../ast/node/Node';
import { RuntimeError } from '../../errors/RuntimeError';
import { ClassValue } from '../../runtime/classes/ClassValue';
import { ITraverseContext } from '../../traverser/Traverser';

export function SuperExpression (_: INode, context: ITraverseContext): ClassValue {
  const { scope } = context;
  const superClass = scope.lookup('super').value;

  if (!(superClass instanceof ClassValue)) {
    throw new RuntimeError(RuntimeError.SUPERCLASS_MUST_BE_A_CLASS, 'super');
  }

  return superClass;
}
