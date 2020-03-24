import { IIdentifier } from '../miscellaneous/Identifier';
import { IStatement } from './Statement';

export interface IBreakStatement extends IStatement {
  type: 'BreakStatement'
  label: IIdentifier | null
}
