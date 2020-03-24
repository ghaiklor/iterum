import { ISpreadElement } from '../miscellaneous/SpreadElement';
import { IExpression } from './Expression';
import { ISuperExpression } from './SuperExpression';

export interface ICallExpression extends IExpression {
  type: 'CallExpression'
  callee: IExpression | ISuperExpression
  arguments: Array<IExpression | ISpreadElement>
}
