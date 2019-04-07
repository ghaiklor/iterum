import { IFunction } from "../functions/Function";
import { IFunctionBody } from "../statements/FunctionBody";
import { IExpression } from "./Expression";

export interface IArrowFunctionExpression extends Pick<IFunction, Exclude<keyof IFunction, "body">>, IExpression {
  type: "ArrowFunctionExpression";
  body: IFunctionBody | IExpression;
  expression: boolean;
}
