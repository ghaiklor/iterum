import { ISwitchCase } from "../clauses/SwitchCase";
import { IExpression } from "../expressions/Expression";
import { IStatement } from "./Statement";

export interface ISwitchStatement extends IStatement {
  type: "SwitchStatement";
  discriminant: IExpression;
  cases: ISwitchCase[];
  lexical: boolean;
}
