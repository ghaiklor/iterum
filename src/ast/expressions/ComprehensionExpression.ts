import { IComprehensionBlock } from "../clauses/ComprehensionBlock";
import { IComprehensionIf } from "../clauses/ComprehensionIf";
import { IExpression } from "./Expression";

export interface IComprehensionExpression extends IExpression {
  type: "ComprehensionExpression";
  body: IExpression;
  blocks: Array<IComprehensionBlock | IComprehensionIf>;
  filter: IExpression | null;
}
