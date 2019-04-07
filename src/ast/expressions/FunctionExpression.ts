import { IFunction } from "../functions/Function";
import { IExpression } from "./Expression";

export interface IFunctionExpression extends IFunction, IExpression {
  type: "FunctionExpression";
}
