import { IComprehensionBlock } from '../clauses/ComprehensionBlock';
import { IExpression } from './Expression';

export interface IComprehensionExpression extends IExpression {
  type: 'ComprehensionExpression'
  body: IExpression
  blocks: IComprehensionBlock[]
  filter: IExpression | null
}
