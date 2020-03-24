import { IExpression } from '../expressions/Expression';
import { INode } from '../node/Node';

export interface IProperty extends INode {
  type: 'Property'
  kind: 'init' | 'get' | 'set'
  key: IExpression
  value: IExpression
  method: boolean
  shorthand: boolean
  computed: boolean
}
