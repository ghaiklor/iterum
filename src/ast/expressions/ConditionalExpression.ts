import { IExpression } from './Expression';

export interface IConditionalExpression extends IExpression {
  type: 'ConditionalExpression'
  test: IExpression
  alternate: IExpression
  consequent: IExpression
}
