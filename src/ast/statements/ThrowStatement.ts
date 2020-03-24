import { IExpression } from '../expressions/Expression';
import { IStatement } from './Statement';

export interface IThrowStatement extends IStatement {
  type: 'ThrowStatement'
  argument: IExpression
}
