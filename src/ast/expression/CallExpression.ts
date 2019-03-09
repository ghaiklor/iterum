import { Expression } from "./Expression";

export class CallExpression extends Expression {
  public callee: Expression;
  public arguments: Expression[];
  constructor(callee: Expression, args: Expression[]) {
    super();

    this.callee = callee;
    this.arguments = args;
  }
}
