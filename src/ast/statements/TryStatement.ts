import { ICatchClause } from "../clauses/CatchClause";
import { IBlockStatement } from "./BlockStatement";
import { IStatement } from "./Statement";

export interface ITryStatement extends IStatement {
  type: "TryStatement";
  block: IBlockStatement;
  handler: ICatchClause | null;
  guardedHandlers: ICatchClause[];
  finalizer: IBlockStatement | null;
}
