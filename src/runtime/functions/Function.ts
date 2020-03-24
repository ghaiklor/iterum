import { ITraverseContext } from '../../traverser/Traverser';
import { Value } from '../Value';

export abstract class Function extends Value {
  public abstract call(args: Value[], context: ITraverseContext): Value;
  public abstract arity(): number;
}
