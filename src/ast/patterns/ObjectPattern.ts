import { IAssignmentProperty } from "../miscellaneous/AssignmentProperty";
import { IPattern } from "./Pattern";
import { IRestElement } from "./RestElement";

export interface IObjectPattern extends IPattern {
  type: "ObjectPattern";
  properties: Array<IAssignmentProperty | IRestElement>;
}
