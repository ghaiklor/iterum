import { IVariableDeclaration } from "../declarations/VariableDeclaration";
import { IExpression } from "../expressions/Expression";
import { IStatement } from "./Statement";

export interface IForInStatement extends IStatement {
  type: "ForInStatement";
  left: IVariableDeclaration | IExpression;
  right: IExpression;
  body: IStatement;
  each: boolean;
}
