import { IIdentifier } from "../miscellaneous/Identifier";
import { ILiteral } from "../miscellaneous/Literal";
import { INode } from "../node/Node";
import { IPattern } from "./Pattern";

export interface IPropertyPattern extends INode {
  type: "PropertyPattern";
  key: ILiteral | IIdentifier;
  value: IPattern;
}