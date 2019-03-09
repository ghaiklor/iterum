import { Expression } from "./Expression";

export class ConditionalExpression extends Expression {
  public test: Expression;
  public consequent: Expression;
  public alternate: Expression;
  constructor(test: Expression, consequent: Expression, alternate: Expression) {
    super();

    this.test = test;
    this.consequent = consequent;
    this.alternate = alternate;
  }
}
