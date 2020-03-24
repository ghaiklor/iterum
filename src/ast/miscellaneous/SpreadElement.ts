import { IExpression } from '../expressions/Expression';
import { INode } from '../node/Node';

export interface ISpreadElement extends INode {
  type: 'SpreadElement'
  argument: IExpression
}
