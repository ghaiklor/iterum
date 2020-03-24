import { ISpreadElement } from '../miscellaneous/SpreadElement';
import { IExpression } from './Expression';

export interface IArrayExpression extends IExpression {
  type: 'ArrayExpression'
  elements: Array<IExpression | ISpreadElement | null>
}
