import { IExpression } from "../expressions/Expression";

export interface ILiteral extends IExpression {
  type: "Literal";
  value: string | boolean | null | number | RegExp;
  raw: string;
}
