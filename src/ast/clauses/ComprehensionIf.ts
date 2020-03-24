import { IExpression } from '../expressions/Expression';
import { INode } from '../node/Node';

export interface IComprehensionIf extends INode {
  type: 'ComprehensionIf'
  test: IExpression
}
