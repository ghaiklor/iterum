import { INode } from "../node/Node";
import { IPattern } from "../patterns/Pattern";
import { IBlockStatement } from "../statements/BlockStatement";

export interface ICatchClause extends INode {
  type: "CatchClause";
  param: IPattern | null;
  body: IBlockStatement;
}
