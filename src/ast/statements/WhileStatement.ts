import { IExpression } from "../expressions/Expression";
import { IStatement } from "./Statement";

export interface IWhileStatement extends IStatement {
  type: "WhileStatement";
  test: IExpression;
  body: IStatement;
}
