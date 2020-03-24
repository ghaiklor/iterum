import { IExpression } from '../expressions/Expression';
import { INode } from '../node/Node';
import { IStatement } from '../statements/Statement';

export interface ISwitchCase extends INode {
  type: 'SwitchCase'
  test: IExpression | null
  consequent: IStatement[]
}
