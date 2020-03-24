import { IClass } from '../classes/Class';
import { IExpression } from '../expressions/Expression';

export interface IClassExpression extends IClass, IExpression {
  type: 'ClassExpression'
}
