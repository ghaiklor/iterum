import { IExpression } from "../expressions/Expression";
import { IFunction } from "../functions/Function";
import { IIdentifier } from "../miscellaneous/Identifier";
import { IPattern } from "../patterns/Pattern";
import { IBlockStatement } from "../statements/BlockStatement";
import { IDeclaration } from "./Declaration";

export interface IFunctionDeclaration extends IFunction, IDeclaration {
  type: "FunctionDeclaration";
  id: IIdentifier;
  params: IPattern[];
  defaults: IExpression[];
  rest: IIdentifier | null;
  body: IBlockStatement | IExpression;
  generator: boolean;
  expression: boolean;
}
