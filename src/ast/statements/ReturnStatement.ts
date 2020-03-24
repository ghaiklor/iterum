import { IExpression } from '../expressions/Expression';
import { IStatement } from './Statement';

export interface IReturnStatement extends IStatement {
  type: 'ReturnStatement'
  argument: IExpression | null
}
