import { IExpression } from "../expressions/Expression";
import { INode } from "../node/Node";

export interface ILiteral extends INode, IExpression {
  type: "Literal";
  value: string | boolean | null | number | RegExp;
  raw: string;
}
