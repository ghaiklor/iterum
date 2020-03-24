import { IExpression } from './Expression';

export interface IAwaitExpression extends IExpression {
  type: 'AwaitExpression'
  argument: IExpression
}
