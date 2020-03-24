import { IExpression } from '../expressions/Expression';
import { IStatement } from './Statement';

export interface IPrintStatement extends IStatement {
  type: 'PrintStatement'
  expression: IExpression
}
