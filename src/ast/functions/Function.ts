import { IExpression } from "../expressions/Expression";
import { IIdentifer } from "../miscellaneous/Identifier";
import { INode } from "../node/Node";
import { IPattern } from "../patterns/Pattern";
import { IBlockStatement } from "../statements/BlockStatement";

export interface IFunction extends INode {
  id: IIdentifer | null;
  params: IPattern[];
  defaults: IExpression[];
  rest: IIdentifer | null;
  body: IBlockStatement | IExpression;
  generator: boolean;
  expression: boolean;
}
