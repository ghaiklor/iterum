import { IExpression } from '../expressions/Expression';
import { IStatement } from './Statement';

export interface IWithStatement extends IStatement {
  type: 'WithStatement'
  object: IExpression
  body: IStatement
}
