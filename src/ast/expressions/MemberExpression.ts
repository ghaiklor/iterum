import { IIdentifer } from "../miscellaneous/Identifier";
import { IExpression } from "./Expression";

export interface IMemberExpression extends IExpression {
  type: "MemberExpression";
  object: IExpression;
  property: IIdentifer | IExpression;
  computed: boolean;
}
