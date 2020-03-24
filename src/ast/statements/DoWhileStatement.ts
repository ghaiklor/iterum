import { IExpression } from '../expressions/Expression';
import { IStatement } from './Statement';

export interface IDoWhileStatement extends IStatement {
  type: 'DoWhileStatement'
  body: IStatement
  test: IExpression
}
