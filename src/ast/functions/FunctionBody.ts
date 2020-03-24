import { IBlockStatement } from '../statements/BlockStatement';
import { IDirective } from '../statements/Directive';
import { IStatement } from '../statements/Statement';

export interface IFunctionBody extends IBlockStatement {
  body: Array<IDirective | IStatement>
}
