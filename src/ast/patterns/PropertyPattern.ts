import { ILiteral } from '../literals/Literal';
import { IIdentifier } from '../miscellaneous/Identifier';
import { INode } from '../node/Node';
import { IPattern } from './Pattern';

export interface IPropertyPattern extends INode {
  type: 'PropertyPattern'
  key: ILiteral | IIdentifier
  value: IPattern
}
