import { IVariableDeclaration } from '../declarations/VariableDeclaration';
import { IExpression } from '../expressions/Expression';
import { IStatement } from './Statement';

export interface IForStatement extends IStatement {
  type: 'ForStatement'
  init: IVariableDeclaration | IExpression | null
  test: IExpression | null
  update: IExpression | null
  body: IStatement
}
