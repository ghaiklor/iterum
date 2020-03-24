import { IIdentifier } from '../miscellaneous/Identifier';
import { IStatement } from './Statement';

export interface ILabeledStatement extends IStatement {
  type: 'LabeledStatement'
  label: IIdentifier
  body: IStatement
}
