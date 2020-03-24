import { IExpression } from '../expressions/Expression';
import { IPattern } from '../patterns/Pattern';

export interface IIdentifier extends IExpression, IPattern {
  type: 'Identifier'
  name: string
}
