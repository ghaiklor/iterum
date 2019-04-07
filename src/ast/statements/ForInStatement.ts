import { IVariableDeclaration } from "../declarations/VariableDeclaration";
import { IExpression } from "../expressions/Expression";
import { IPattern } from "../patterns/Pattern";
import { IStatement } from "./Statement";

export interface IForInStatement extends IStatement {
  type: "ForInStatement";
  left: IVariableDeclaration | IPattern;
  right: IExpression;
  body: IStatement;
}
