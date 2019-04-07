import { IExpression } from "../expressions/Expression";
import { IIdentifier } from "../miscellaneous/Identifier";

export interface IMetaProperty extends IExpression {
  type: "MetaProperty";
  meta: IIdentifier;
  property: IIdentifier;
}
