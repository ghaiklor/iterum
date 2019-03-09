import { Property } from "../Property";
import { Expression } from "./Expression";

export class ObjectExpression extends Expression {
  public properties: Property[];
  constructor(properties: Property[]) {
    super();

    this.properties = properties;
  }
}
