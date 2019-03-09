import { Expression } from "./Expression";

export class NewExpression extends Expression {
  public callee: Expression;
  public arguments: Expression[];
  constructor(callee: Expression, args: Expression[]) {
    super();

    this.callee = callee;
    this.arguments = args;
  }
}
