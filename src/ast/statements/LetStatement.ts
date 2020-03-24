import { IVariableDeclarator } from '../declarations/VariableDeclarator';
import { IStatement } from './Statement';

export interface ILetStatement extends IStatement {
  type: 'LetStatement'
  head: IVariableDeclarator[]
  body: IStatement
}
