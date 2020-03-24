import { ISpreadElement } from '../miscellaneous/SpreadElement';
import { IExpression } from './Expression';

export interface INewExpression extends IExpression {
  type: 'NewExpression'
  callee: IExpression
  arguments: Array<IExpression | ISpreadElement>
}
