import { IExpression } from './Expression';

export interface ISequenceExpression extends IExpression {
  type: 'SequenceExpression'
  expressions: IExpression[]
}
