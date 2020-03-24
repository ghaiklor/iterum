import { IDeclaration } from '../declarations/Declaration';
import { IIdentifier } from '../miscellaneous/Identifier';
import { IClass } from './Class';

export interface IClassDeclaration extends IClass, IDeclaration {
  type: 'ClassDeclaration'
  id: IIdentifier
}
