import { IStatement } from "./Statement";

export interface IBlockStatement extends IStatement {
  type: "BlockStatement";
  body: IStatement[];
}
