import { IClassBody } from "../declarations/ClassBody";
import { IExpression } from "../expressions/Expression";
import { IIdentifier } from "../miscellaneous/Identifier";

export interface IClassExpression extends IExpression {
  type: "ClassExpression";
  id: IIdentifier | null;
  superClass: IExpression | null;
  body: IClassBody;
}
