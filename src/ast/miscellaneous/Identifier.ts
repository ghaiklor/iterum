import { IExpression } from "../expressions/Expression";
import { INode } from "../node/Node";
import { IPattern } from "../patterns/Pattern";

export interface IIdentifer extends INode, IExpression, IPattern {
  type: "Identifier";
  name: string;
}
