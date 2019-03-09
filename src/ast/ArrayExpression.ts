import { Expression } from "./Expression";

export class ArrayExpression extends Expression {
  public elements: Expression[];
  constructor(elements: Expression[]) {
    super();

    this.elements = elements;
  }
}
