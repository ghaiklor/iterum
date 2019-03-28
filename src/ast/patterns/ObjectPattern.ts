import { IIdentifier } from "../miscellaneous/Identifier";
import { ILiteral } from "../miscellaneous/Literal";
import { IPattern } from "./Pattern";

export interface IObjectPattern extends IPattern {
  type: "ObjectPattern";
  properties: Array<{ key: ILiteral | IIdentifier, value: IPattern }>;
}
