import { IProperty } from "../miscellaneous/Property";
import { IExpression } from "./Expression";

export interface IObjectExpression extends IExpression {
  type: "ObjectExpression";
  properties: IProperty[];
}
