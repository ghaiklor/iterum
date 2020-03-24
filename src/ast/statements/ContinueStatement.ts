import { IIdentifier } from '../miscellaneous/Identifier';
import { IStatement } from './Statement';

export interface IContinueStatement extends IStatement {
  type: 'ContinueStatement'
  label: IIdentifier | null
}
