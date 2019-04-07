import { IPattern } from "../patterns/Pattern";
import { IProperty } from "./Property";

export interface IAssignmentProperty extends IProperty {
  type: "Property";
  value: IPattern;
  kind: "init";
  method: false;
}
