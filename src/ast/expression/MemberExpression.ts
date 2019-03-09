import { Expression } from "./Expression";

export class MemberExpression extends Expression {
  public object: Expression;
  public property: Expression;
  constructor(object: Expression, property: Expression) {
    super();

    this.object = object;
    this.property = property;
  }
}
