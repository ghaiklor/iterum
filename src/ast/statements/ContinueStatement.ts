import { IIdentifer } from "../miscellaneous/Identifier";
import { IStatement } from "./Statement";

export interface IContinueStatement extends IStatement {
  type: "ContinueStatement";
  label: IIdentifer | null;
}
