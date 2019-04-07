import { IFunction } from "../functions/Function";
import { IIdentifier } from "../miscellaneous/Identifier";
import { IDeclaration } from "./Declaration";

export interface IFunctionDeclaration extends IFunction, IDeclaration {
  type: "FunctionDeclaration";
  id: IIdentifier;
}
