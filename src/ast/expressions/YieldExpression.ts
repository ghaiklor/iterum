import { IExpression } from './Expression';

export interface IYieldExpression extends IExpression {
  type: 'YieldExpression'
  argument: IExpression | null
  delegate: boolean
}
