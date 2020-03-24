import { IVariableDeclarator } from '../declarations/VariableDeclarator';
import { IExpression } from './Expression';

export interface ILetExpression extends IExpression {
  type: 'LetExpression'
  head: IVariableDeclarator[]
  body: IExpression
}
