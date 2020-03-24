import { IExpression } from '../expressions/Expression';
import { IStatement } from './Statement';

export interface IIfStatement extends IStatement {
  type: 'IfStatement'
  test: IExpression
  consequent: IStatement
  alternate: IStatement | null
}
