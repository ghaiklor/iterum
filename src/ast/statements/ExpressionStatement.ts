import { IExpression } from "../expressions/Expression";
import { IStatement } from "./Statement";

export interface IExpressionStatement extends IStatement {
  type: "ExpressionStatement";
  expression: IExpression;
}
