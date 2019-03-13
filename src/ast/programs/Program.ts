import { INode } from "../node/Node";
import { IStatement } from "../statements/Statement";

export interface IProgram extends INode {
  type: "Program";
  body: IStatement[];
}
