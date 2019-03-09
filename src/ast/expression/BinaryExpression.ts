import { Expression } from "./Expression";

export class BinaryExpression extends Expression {
  public left: Expression;
  public operator: string;
  public right: Expression;
  constructor(left: Expression, operator: string, right: Expression) {
    super();

    this.left = left;
    this.operator = operator;
    this.right = right;
  }
}
