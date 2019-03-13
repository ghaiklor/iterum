import { INode } from "../node/Node";
import { IPattern } from "../patterns/Pattern";

export interface IExpression extends INode, IPattern {
  type: string;
}
