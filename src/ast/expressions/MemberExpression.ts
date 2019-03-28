import { IIdentifier } from "../miscellaneous/Identifier";
import { IExpression } from "./Expression";

export interface IMemberExpression extends IExpression {
  type: "MemberExpression";
  object: IExpression;
  property: IIdentifier | IExpression;
  computed: boolean;
}
