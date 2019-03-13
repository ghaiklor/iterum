import { IExpression } from "../expressions/Expression";
import { INode } from "../node/Node";
import { IPattern } from "../patterns/Pattern";

export interface IComprehensionBlock extends INode {
  type: "ComprehensionBlock";
  left: IPattern;
  right: IExpression;
  each: boolean;
}
