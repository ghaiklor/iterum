import { IPattern } from "./Pattern";
import { IPropertyPattern } from "./PropertyPattern";

export interface IObjectPattern extends IPattern {
  type: "ObjectPattern";
  properties: IPropertyPattern[];
}
