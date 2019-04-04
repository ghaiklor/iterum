import { IExpression } from "../expressions/Expression";
import { IIdentifier } from "../miscellaneous/Identifier";
import { IClassBody } from "./ClassBody";
import { IDeclaration } from "./Declaration";

export interface IClassDeclaration extends IDeclaration {
  type: "ClassDeclaration";
  id: IIdentifier | null;
  superClass: IExpression | null;
  body: IClassBody;
}
