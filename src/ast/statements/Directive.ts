import { ILiteral } from '../literals/Literal';
import { INode } from '../node/Node';

export interface IDirective extends INode {
  type: 'ExpressionStatement'
  expression: ILiteral
  directive: string
}
