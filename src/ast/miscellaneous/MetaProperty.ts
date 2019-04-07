import { IExpression } from "../expressions/Expression";
import { IIdentifier } from "./Identifier";

export interface IMetaProperty extends IExpression {
  type: "MetaProperty";
  meta: IIdentifier;
  property: IIdentifier;
}
