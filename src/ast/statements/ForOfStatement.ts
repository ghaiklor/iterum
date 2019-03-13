import { IVariableDeclaration } from "../declarations/VariableDeclaration";
import { IExpression } from "../expressions/Expression";
import { IStatement } from "./Statement";

export interface IForOfStatement extends IStatement {
  type: "ForOfStatement";
  left: IVariableDeclaration | IExpression;
  right: IExpression;
  body: IStatement;
}
