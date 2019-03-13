import { IExpression } from "../expressions/Expression";
import { INode } from "../node/Node";
import { IPattern } from "../patterns/Pattern";

export interface IVariableDeclarator extends INode {
  type: "VariableDeclarator";
  id: IPattern;
  init: IExpression | null;
}
