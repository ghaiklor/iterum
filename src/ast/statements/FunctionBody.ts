import { IBlockStatement } from "./BlockStatement";
import { IDirective } from "./Directive";
import { IStatement } from "./Statement";

export interface IFunctionBody extends IBlockStatement {
  body: Array<IDirective | IStatement>;
}
