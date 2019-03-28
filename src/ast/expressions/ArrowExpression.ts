import { IFunction } from "../functions/Function";
import { IIdentifier } from "../miscellaneous/Identifier";
import { IPattern } from "../patterns/Pattern";
import { IBlockStatement } from "../statements/BlockStatement";
import { IExpression } from "./Expression";

export interface IArrowExpression extends IFunction, IExpression {
  type: "ArrowExpression";
  params: IPattern[];
  defaults: IExpression[];
  rest: IIdentifier | null;
  body: IBlockStatement | IExpression;
  generator: boolean;
  expression: boolean;
}
