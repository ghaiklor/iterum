import { IStatement } from "./Statement";

export interface IDebuggerStatement extends IStatement {
  type: "DebuggerStatement";
}
