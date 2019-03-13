import { IExpression } from "../expressions/Expression";
import { INode } from "../node/Node";
import { IPattern } from "../patterns/Pattern";
import { IBlockStatement } from "../statements/BlockStatement";

export interface ICatchClause extends INode {
  type: "CatchClause";
  param: IPattern;
  guard: IExpression | null;
  body: IBlockStatement;
}
