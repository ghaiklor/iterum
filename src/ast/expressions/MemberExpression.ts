import { IPattern } from '../patterns/Pattern';
import { IExpression } from './Expression';
import { ISuperExpression } from './SuperExpression';

export interface IMemberExpression extends IExpression, IPattern {
  type: 'MemberExpression'
  object: IExpression | ISuperExpression
  property: IExpression
  computed: boolean
}
