import { IComprehensionBlock } from "../clauses/ComprehensionBlock";
import { IComprehensionIf } from "../clauses/ComprehensionIf";
import { IExpression } from "./Expression";

export interface IGeneratorExpression extends IExpression {
  type: "GeneratorExpression";
  body: IExpression;
  blocks: Array<IComprehensionBlock | IComprehensionIf>;
  filter: IExpression | null;
}
