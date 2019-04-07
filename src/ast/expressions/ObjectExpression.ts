import { ISpreadElement } from "../miscellaneous/SpreadElement";
import { IProperty } from "../properties/Property";
import { IExpression } from "./Expression";

export interface IObjectExpression extends IExpression {
  type: "ObjectExpression";
  properties: Array<IProperty | ISpreadElement>;
}
