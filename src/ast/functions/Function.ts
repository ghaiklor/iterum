import { IIdentifier } from "../miscellaneous/Identifier";
import { INode } from "../node/Node";
import { IPattern } from "../patterns/Pattern";
import { IFunctionBody } from "../statements/FunctionBody";

export interface IFunction extends INode {
  id: IIdentifier | null;
  params: IPattern[];
  body: IFunctionBody;
  generator: boolean;
  async: boolean;
}
