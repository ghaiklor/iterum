import { IFunction } from "../functions/Function";
import { IIdentifier } from "../miscellaneous/Identifier";
import { IPattern } from "../patterns/Pattern";
import { IBlockStatement } from "../statements/BlockStatement";
import { IExpression } from "./Expression";

export interface IArrowFunctionExpression extends IFunction, IExpression {
  type: "ArrowFunctionExpression";
  params: IPattern[];
  defaults: IExpression[] | null;
  rest: IIdentifier | null;
  body: IBlockStatement | IExpression;
  generator: boolean;
  expression: boolean;
}
