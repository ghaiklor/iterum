import { IFunction } from "../functions/Function";
import { IIdentifer } from "../miscellaneous/Identifier";
import { IPattern } from "../patterns/Pattern";
import { IBlockStatement } from "../statements/BlockStatement";
import { IExpression } from "./Expression";

export interface IArrowExpression extends IFunction, IExpression {
  type: "ArrowExpression";
  params: IPattern[];
  defaults: IExpression[];
  rest: IIdentifer | null;
  body: IBlockStatement | IExpression;
  generator: boolean;
  expression: boolean;
}
