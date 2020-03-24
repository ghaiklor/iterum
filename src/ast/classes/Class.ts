import { IExpression } from '../expressions/Expression';
import { IIdentifier } from '../miscellaneous/Identifier';
import { INode } from '../node/Node';
import { IClassBody } from './ClassBody';

export interface IClass extends INode {
  id: IIdentifier | null
  superClass: IExpression | null
  body: IClassBody
}
