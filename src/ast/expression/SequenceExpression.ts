import { Expression } from "./Expression";

export class SequenceExpression extends Expression {
  public expressions: Expression[];
  constructor(expressions: Expression[]) {
    super();

    this.expressions = expressions;
  }
}
