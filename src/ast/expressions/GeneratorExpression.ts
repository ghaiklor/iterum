import { IComprehensionBlock } from "../clauses/ComprehensionBlock";
import { IExpression } from "./Expression";

export interface IGeneratorExpression extends IExpression {
  type: "GeneratorExpression";
  body: IExpression;
  blocks: IComprehensionBlock[];
  filter: IExpression | null;
}
