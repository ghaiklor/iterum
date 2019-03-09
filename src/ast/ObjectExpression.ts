import { Expression } from "./Expression";
import { Property } from "./Property";

export class ObjectExpression extends Expression {
  public properties: Property[];
  constructor(properties: Property[]) {
    super();

    this.properties = properties;
  }
}
