import { IProperty } from "../miscellaneous/Property";
import { ISpreadElement } from "../miscellaneous/SpreadElement";
import { IExpression } from "./Expression";

export interface IObjectExpression extends IExpression {
  type: "ObjectExpression";
  properties: Array<IProperty | ISpreadElement>;
}
