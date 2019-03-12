import { Expression } from "../expression/Expression";
import { Statement } from "./Statement";

export class ExpressionStatement extends Statement {
  public expression: Expression;
  constructor(expression: Expression) {
    super();

    this.expression = expression;
  }
}
