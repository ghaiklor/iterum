import { Expression } from "./Expression";

export class UpdateExpression extends Expression {
  public argument: Expression;
  public operator: string;
  public prefix: boolean;
  constructor(argument: Expression, operator: string, prefix: boolean) {
    super();

    this.argument = argument;
    this.operator = operator;
    this.prefix = prefix;
  }
}
