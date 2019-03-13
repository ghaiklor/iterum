import { IExpression } from "../expressions/Expression";
import { IFunction } from "../functions/Function";
import { IIdentifer } from "../miscellaneous/Identifier";
import { IPattern } from "../patterns/Pattern";
import { IBlockStatement } from "../statements/BlockStatement";
import { IDeclaration } from "./Declaration";

export interface IFunctionDeclaration extends IFunction, IDeclaration {
  type: "FunctionDeclaration";
  id: IIdentifer;
  params: IPattern[];
  defaults: IExpression[];
  rest: IIdentifer | null;
  body: IBlockStatement | IExpression;
  generator: boolean;
  expression: boolean;
}
